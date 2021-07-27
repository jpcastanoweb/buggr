# Proyecto 2

# Modelo de Negocio

## Objetivo principal

Buggr CRM will improve your development projects' life-cycle by enhancing productivity, processes, and pipeline visibility for your team.

## Características

Buggr is a tool designed to increase visibility into the status of a development team's projects. Users are able to register and create their organizations. Each organization can then keep track of their different projects and at what stage they are at in order to avoid any of them falling through the cracks.

Functionality:

- See all projects side by side
- Add projects for the entire team to see, keeping track of dollar value, finish dates, current stage, and more.
- Add focuments to project to keep track of important materials like contracts and resources.
- Move projects across different stages of development and easily flag stuck ones.

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

Opportunity

| Property            | Value         |
| ------------------- | ------------- |
| id                  | ObjectId      |
| title               | String \*     |
| openedDate          | Date          |
| closeDate           | Date          |
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

### GET Methods

| Ruta                         | Descripción                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| /                            | Home. Website landing where the user and get information about Buggr's value and functionality. |
| /aboutus                     | Information about the team behind Buggr                                                         |
| /product                     | Information about Buggr, its capabilities and value                                             |
| /contactus                   | Form to contact us for any information or request.                                              |
| /register                    | Register as a user                                                                              |
| /login                       | Login to your account                                                                           |
| /app                         | Application Dashboard                                                                           |
| /app/myprofile               | User's profile                                                                                  |
| /app/myprofile/edit          | Edit User's profile                                                                             |
| /app/createOrg               | Create a new organization                                                                       |
| /app/org/:orgId              | Organization's page                                                                             |
| /app/org/:orgId/edit         | Edit organization                                                                               |
| /app/createproject           | Create a new project for the current organization                                               |
| /app/project/:projectId      | Project's page                                                                                  |
| /app/project/:projectId/edit | Edit a project                                                                                  |
| /app/createopp               | Create a new opportunity for the current organization                                           |
| /app/opp/:oppId              | Opportunity's page                                                                              |
| /app/opp/:oppId/edit         | Edit an opportunity                                                                             |

### Métodos POST

| Ruta                           | Descripción                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| /register                      | Request to register as a user                                    |
| /login                         | Request to login to your account                                 |
| /contactus                     | Submit form to contact us for any information or request.        |
| /app/myprofile/edit            | Request to edit User's profile                                   |
| /app/createOrg                 | Request to create a new organization                             |
| /app/org/:orgId/edit           | Request to edit organization                                     |
| /app/org/:orgId/delete         | Request to delete an organization                                |
| /app/createproject             | Request to create a new project for the current organization     |
| /app/project/:projectId/edit   | Request to edit a project                                        |
| /app/project/:projectId/delete | Request to delete a project                                      |
| /app/createopp                 | Request to create a new opportunity for the current organization |
| /app/opp/:oppId/edit           | Request to edit an opportunity                                   |
| /app/opp/:oppId/delete         | Request to delete an opportunity                                 |
