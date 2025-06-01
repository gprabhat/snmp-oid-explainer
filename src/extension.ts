import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  // Cache for decoded OIDs to avoid repeated exec calls
  const decodeCache = new Map<string, Promise<string>>();

  context.subscriptions.push(
    vscode.languages.registerHoverProvider({ scheme: 'file' }, {
      provideHover(document, position) {
        // Get OID under cursor (basic regex for OID)
        const range = document.getWordRangeAtPosition(position, /\.?\d+(\.\d+)+/);
        if (!range) return;

        const oid = document.getText(range);

        // If decoding is in progress, show "decoding..."
        if (decodeCache.has(oid)) {
          // Return a promise hover with decoding message while resolving
          return decodeCache.get(oid)!.then(decoded => {
            return new vscode.Hover(`OID: ${oid}\n\n\`\`\`\n${decoded}\n\`\`\``);
          }).catch(() => {
            return new vscode.Hover(`OID: ${oid}\n\nFailed to decode.`);
          });

        } else {
          // Start decoding and save promise in cache
          const decodePromise = decodeOid(oid);
          decodeCache.set(oid, decodePromise);

          // Show decoding message immediately, then update hover when done
          return new Promise<vscode.Hover>((resolve) => {
            // Show decoding first
            resolve(new vscode.Hover(`OID: ${oid}\n\nDecoding...`));
            // When done, update cache and trigger hover update
            decodePromise.then(() => {
              // We can't programmatically refresh hover,
              // user needs to hover again to see updated info.
              // Or we rely on cache next time.
            });
          });
        }
      }
    })
  );
}

function decodeOid(oid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Remove leading dot if any
    const cleanOid = oid.replace(/^\./, '');

    // Run snmptranslate -On .1.3.6.1.2.1.1.1.0 or snmptranslate OID
    exec(`snmptranslate -Td ${cleanOid}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
        return;
      }
      const output = stdout.trim();
      // If output is the same as input (or empty), maybe no translation
      if (!output || output === cleanOid) {
        resolve(`No translation found for OID ${oid}`);
      } else {
        resolve(output);
      }
    });
  });
}
