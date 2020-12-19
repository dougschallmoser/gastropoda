![Gastropoda](https://user-images.githubusercontent.com/65590878/102676983-f6497680-4154-11eb-91c8-250f07642579.png)

# Gastropoda

Gastropoda is a literary magazine that seeks to celebrate the spiralic nature of life by showcasing unique short stories. This is a single page application built with a vanilla JavaScript frontend and Rails backend API.

[Live Demo](https://gastropoda.netlify.app/)

[Demo Video](https://youtu.be/5GDocLklNW0)

## Installation

To run this application in your local environment, please follow these steps:

```
1. Clone this repository
2. Change directory to gastropoda-frontend
3. In the src/adapters directory:

   -Uncomment the following line in CommentsAdapter.js:
   this.baseUrl = 'http://localhost:3000/api/v1/comments'

   -Uncomment the following line in EntriesAdapter.js:
   this.baseUrl = 'http://localhost:3000/api/v1/entries'

4. Change directory to gastropoda-backend
5. Run 'bundle install'
6. If database does not exist, Run 'rails db:create'
7. Run 'rails db:migrate'
8. Run 'rails db:seed'
9. Run 'rails s'
10. Open the 'index.html' file in your browser
```


## Contributing

Bug reports and pull requests are welcome on Github at:
https://github.com/dougschallmoser/gastropoda-js-app

This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.
 

## Authors

* **Doug Schallmoser** - *All work* - [DougSchallmoser](https://github.com/dougschallmoser)


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)


## Acknowledgments

I would like to acknowledge my wife for inspiring the idea for this application.
