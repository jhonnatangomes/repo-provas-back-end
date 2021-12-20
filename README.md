# RepoProvas

This is the back-end part of the RepoProvas application. You can find the front-end part [here].
This is a RESTful API written with node.js. All routes of this application are public.

### How to run

Clone the repository in your computer and head over to the newly created directory:

    git clone https://github.com/jhonnatangomes/repo-provas-back-end
    cd repo-provas-back-end

Then, install dependencies:

    npm install

After everything has been installed, enter in createDB folder and run create-databases script:

    cd createDB
    bash create-databases

You might be prompted to type in your password. After everything is done you can use the connect-database scripts to connect to database:

    bash connect-database
    bash connect-database-test

To start project in development database, just navigate to project root folder and do:

    npm run dev

To open project in test database with watch enabled, do:

    npm run test:watch

To just run tests a single time do:

    npm run test

#### Destroying databases

If you want to delete databases at any time, you can just run destroy-database script in createDB folder with:

    bash destroy-databases

## Endpoints

<details>
<summary>POST /provas</summary>
Expects a body in the following format

    {
        name: 'Jhonn',
        category: 'P1',
        semester: '1º',
        subject: 'Mecânica Quântica',
        teacher: 'José Amarelo',
        link: 'https://eloquentjavascript.net/Eloquent_JavaScript.pdf',
    }

Link needs to be a valid pdf link.

</details>

<details>
<summary>GET /info</summary>
Returns an object in the format

    {
        "categories": [
            "P1",
            "P2",
            "P3",
            "2ch",
            "Outras"
        ],
        "semesters": [
            "1º",
            "2º",
            "3º",
            "4º",
            "5º",
            "6º",
            "7º",
            "8º",
            "Eletivas"
        ],
        "subjects": [
            "Cálculo I",
            "Álgebra Linear",
            "Eletromagnetismo",
            "Mecânica Quântica"
        ]
    }

</details>

<details>
<summary>GET /info/professores?disciplina=example</summary>
Returns the teachers from a given subject. Subject parameter is required. Returns an object in the format

    {
        "subject": "Álgebra Linear",
        "teachers": [
            "João branco",
            "José Amarelo"
        ]
    }

</details>

[here]: https://github.com/jhonnatangomes/repo-provas
