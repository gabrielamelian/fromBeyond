#pragma strict

import UnityEngine.UI;

public var text : Text;
public var state : State;

private var dialogLines : String[] = [
    "CRAWFORD: Thank you for coming in such short notice. I know it's dark, but I cannot get the main power on... It would be too much... I would not dare.",
    "CRAWFORD: I have to show you, I have to show someone..."
];

function AddSubtitle() {
    if (state.dialogLinesIndex >= dialogLines.length) {
        state.initialDialogCompleted = true;
        text.enabled = false;
    } else {
        text.text = dialogLines[state.dialogLinesIndex];
        text.enabled = true;
        state.dialogLinesIndex += 1;
        state.initialDialogStarted = true;
    }
}