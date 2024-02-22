/*
Script para mover los paddles en ping pong

Diego Ortega Fernández
21/02/2024
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControlTodo : MonoBehaviour
{
    public GameObject dot;
    public float force;

    // Start is called before the first frame update
    void Start()
    {
        StartGame();
    }

    // Update is called once per frame
    void Update()
    {

    }

    void StartGame()
    {
        Rigidbody2D dotRigidbody = dot.GetComponent<Rigidbody2D>();

        // Generar una dirección de movimiento aleatoria horizontal
        Vector2 randomDirection = new Vector2(Random.Range(-1f, 1f), 0f).normalized;

        // Aplicar la dirección aleatoria y la fuerza al Rigidbody de la pelota
        dotRigidbody.velocity = randomDirection * force;
    }
}
