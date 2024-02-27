using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PongScore : MonoBehaviour
{
    // Start is called before the first frame update

    GameController controller;
    public int side;


    void Start()
    {
        controller = GameObject.FindWithTag("GameController").GetComponent<GameController>();
    }

    void OnTriggerExit2D(Collider2D other){
        controller.AddPoints(side);

    }
}
