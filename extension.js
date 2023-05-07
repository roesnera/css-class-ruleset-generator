// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "css-class-ruleset-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('css-class-ruleset-generator.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// BEGINING MY CODE HERE

		const reactComponentFile = vscode.window.activeTextEditor?.document;
		// if (!reactComponentFile || reactComponentFile.languageId !== 'javascriptreact') {
		// 	vscode.window.showErrorMessage('No active React component file found!');
		// 	return;
		// }

		vscode.window.showWarningMessage("WARNING: Function running fine 😂")

		const classNames = [];
		const classRegex = /className="([^"]+)"/g;
		let match=classRegex.exec(reactComponentFile.getText());
		while (match = classRegex.exec(reactComponentFile.getText())) {
			classNames.push(...match[1].split(' '));
		}

		console.log(classNames); // Output classNames to the console for testing purposes.

		// Prompt the user to specify the path and name of the CSS file.
		const cssFilePath = vscode.window.showInputBox({
			prompt: 'Enter the path and name of the CSS file to generate',
			value: path.join(__dirname, 'styles.css') // Default value.
		});

		// Generate the CSS file content.
		let cssContent = '';
		for (const className of classNames) {
			cssContent += `.${className} {\n\t\n}\n\n`;
		}

		// Write the CSS file.
		fs.writeFile(cssFilePath, cssContent, (err) => {
			if (err) {
				vscode.window.showErrorMessage(`Failed to save CSS file: ${err.message}`);
			} else {
				vscode.window.showInformationMessage(`CSS file saved to ${cssFilePath}`);
			}
		});
			});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
