/*
Script para mover los paddles en ping pong

Diego Ortega Fernández
21/02/2024
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class GameController : MonoBehaviour
{
    public GameObject circlePrefab;
    public GameObject dot;
    public float force;

    public int pointsLeft = 0;
    public int pointsRight = 0;

    public TMP_Text leftScore;
    public TMP_Text rightScore;

    // Start is called before the first frame update
    void Start()
    {
        StartGame();
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetKeyDown(KeyCode.R)){
            Destroy(dot);
            StartGame();
        }
    }

    public void Reset(){

        Destroy(dot);
        StartGame();

    }

    public void StartGame()
    {

        // Create a copy of the prefab object

        dot = Instantiate(circlePrefab);
        dot.GetComponent<Rigidbody2D>().velocity = Random.onUnitSphere * force;
        
        Rigidbody2D dotRigidbody = dot.GetComponent<Rigidbody2D>();

    }

    public void AddPoints(int side){

        if(side == 1){
            pointsLeft++;
            leftScore.text = pointsLeft.ToString();
        } else {
            pointsRight++;
            rightScore.text = pointsRight.ToString();
        }
        Destroy(dot);
        StartGame();
    }
}