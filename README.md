# SNMP OID Explainer

![Version](https://img.shields.io/badge/version-unpublished-lightgrey)
![License](https://img.shields.io/github/license/gprabhat/snmp-oid-explainer)
![Downloads](https://img.shields.io/badge/downloads-unpublished-lightgrey)

A Visual Studio Code extension to automatically decode and display information about SNMP OIDs (Object Identifiers) inline.

### 🔍 Features

- ⬇️ **Automatic decoding** of OIDs like `.1.3.6.1.2.1.1.1.0`
- 🧠 **Offline decoding** using `snmptranslate`
- 💬 **Hover descriptions** show complete MIB details
- 📦 Lightweight and local – does **not require online access**
- ✅ Supports line-by-line decoding throughout files

### 📸 Example


OID: .1.3.6.1.2.1.1.1.0

SNMPv2-MIB::sysDescr.0 sysDescr OBJECT-TYPE
-- FROM SNMPv2-MIB, RFC1213-MIB
-- TEXTUAL CONVENTION DisplayString
SYNTAX OCTET STRING (0..255)
DISPLAY-HINT "255a"
MAX-ACCESS read-only
STATUS current
DESCRIPTION "A textual description of the entity..."


## ⚙️ Requirements

This extension uses the `snmptranslate` command internally. You must install Net-SNMP on your system.

### ✅ Install `snmptranslate`

- **Ubuntu/Debian**:  
  `sudo apt install snmp`

- **macOS (Homebrew)**:  
  `brew install net-snmp`

- **Windows**:  
  Download and install from:  
  https://sourceforge.net/projects/net-snmp/files/net-snmp%20binaries/5.7-binaries/

Ensure `snmptranslate` is available in your system PATH.

## 📦 Installation

1. [Download the `.vsix` file](https://github.com/gprabhat/snmp-oid-explainer/releases) from the latest release.
2. Open VS Code and run the command:  
   `Extensions: Install from VSIX...`  
   (You can find it in the Command Palette with `Ctrl+Shift+P`)
3. Select the downloaded `.vsix` file to install the extension.
4. Open a file that contains SNMP OIDs.
5. Hover over an OID like `.1.3.6.1.2.1.1.1.0` to see its meaning.
6. Watch as "decoding..." becomes a fully translated result.


## 🚀 How It Works

- Watches your document for SNMP OID patterns
- Calls `snmptranslate -Td` on each unique OID
- Displays decoded data in hover popup
- Skips re-processing already decoded OIDs for speed

## 🧪 Known Limitations

- Only works if `snmptranslate` is correctly installed
- Works best on plain text or config/log files
- Does not yet support inline editing or auto-correction

## 🛠️ Developer Setup

Clone and install dependencies:

```bash
git clone https://github.com/gprabhat/snmp-oid-explainer.git
cd snmp-oid-explainer
npm install
code .
