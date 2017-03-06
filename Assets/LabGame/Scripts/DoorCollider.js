#pragma strict

public var state : State;

function OnTriggerEnter(other : Collider) {
    state.hasCrossedDoor = true;
}