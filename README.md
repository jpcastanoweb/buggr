# Proyecto 2

# Modelo de Negocio

## Objetivo principal

Buggr CRM will improve your development projects' life-cycle by enhancing productivity, processes, and pipeline visibility for your team.

## Características

# Desarrollo Backend

## Modelos de Base de Datos

User

| Property      | Value                             |
| ------------- | --------------------------------- |
| id            | ObjectId                          |
| username      | Área de registro para el usuario. |
| email         | String \*                         |
| passwordHash  | String \*                         |
| firstName     | String \*                         |
| lastName      | String \*                         |
| role          | String                            |
| organizations | [ #Organization ]                 |

Organization

| Property           | Value         |
| ------------------ | ------------- |
| id                 | ObjectId      |
| name               | String \*     |
| admin              | #User \*      |
| projects           | [ #ObjectId ] |
| number_of_projects | Number        |

Project

| Property            | Value         |
| ------------------- | ------------- |
| id                  | ObjectId      |
| title               | String \*     |
| startDate           | Date          |
| goalDate            | Date          |
| currentStage        | String \*     |
| dollarValue         | String \*     |
| contactFullName     | String \*     |
| contactPhoneNumber  | String \*     |
| contactEmailAddress | String \*     |
| posts               | [ #ObjectId ] |
| documents           | [ #ObjectId ] |

Post

| Property    | Value         |
| ----------- | ------------- |
| id          | ObjectId      |
| belongsTo   | #ObjectId \*  |
| dateCreated | Date          |
| author      | [ #ObjectId ] |
| body        | String \*     |

Comment

| Property    | Value         |
| ----------- | ------------- |
| id          | ObjectId      |
| belongsTo   | #ObjectId \*  |
| dateCreated | Date          |
| author      | [ #ObjectId ] |
| body        | String \*     |

## Ruteo

### Métodos GET

| Ruta           | Descripción                                                                |
| -------------- | -------------------------------------------------------------------------- |
| /              | Home. Landing del usuario donde ve la propuesta de valor de la aplicación. |
| /registro      | Área de registro para el usuario.                                          |
| /iniciarsesion |
| /cerrarsesion  |

### Métodos POST

| Ruta    | Descripción                           |
| ------- | ------------------------------------- |
| /buscar | Petición para búsqueda de un producto |
