#pragma strict

import UnityStandardAssets.Characters.ThirdPerson;
import UnityStandardAssets.Characters.FirstPerson;

public var state : State;
public var player : GameObject;
public var textManager : TextManager;
public var superMachine : Transform;

private var target : Transform;
private var agent : NavMeshAgent;
private var character : ThirdPersonCharacter;
private var playerController : FirstPersonController;

function Start () {
    agent = GetComponent(NavMeshAgent);
	character = GetComponent(ThirdPersonCharacter);
	playerController = player.GetComponent(FirstPersonController);

	agent.updateRotation = false;
	agent.updatePosition = true;
}

function Update () {
    if(state.hasCrossedDoor === true) {
        target = player.transform;
    }
    if(state.initialDialogCompleted === true) {
        target = superMachine;
        playerController.enabled = true;
    }
    MoveCrawford();
}

function MoveCrawford() {
    if(target != null) {
        agent.SetDestination(target.position);

        if(agent.remainingDistance < agent.stoppingDistance && agent.remainingDistance != 0) {
            character.Move(Vector3.zero, false, false);
            if(state.initialDialogCompleted === false) {
                InitialDialog();
            }
        } else {
            character.Move(agent.desiredVelocity, false, false);
        }
    }
}

function InitialDialog() {
    playerController.enabled = false;
    player.transform.GetChild(0).LookAt(this.gameObject.transform.GetChild(2).GetChild(0).transform);
    if(state.initialDialogStarted === false) {
        textManager.AddSubtitle();
    }
    if(Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.Space)) {
        textManager.AddSubtitle();
    }
}
