# Atlier


** OVERVIEW: **
Atelier is our Front End Capstone project. It is a single page application written in React, with an Express and Nodejs server running in the background. This repo comprises four widgets and is a clone of Target.com’s product pages. It uses an external API to make real-time calls and return product data and information.
This repo comprises four widgets that create a single product page for our organization.

**Table of Contents**
*[Overview Widget](#Overview)
*[Related Products Widget](#RelatedProductsWidget)
*[Questions Widget Widget](#QuestionsWidget)
*[Ratings And Reviews Widget](#RatingsAndReviewsWidget)
*[Team Members](#TeamMembers)

**Overview Widget:**

![alt_text](https://github.com/Tomorrow-Never-Dies/Front-End-Capstone/blob/main/screenshots/Screen%20Shot%202023-01-12%20at%2012.20.34%20PM.png)

This widget contains the overview information for the currently selected product. It allows users the capablity of:
- Selecting from the different styles for the current product
- Viewing and switching between all the images for the currently selected style
- Once the style is selected it will allow user to select size and quantity based on stock availiblity
- View an expanded version of the currently selected image
- Viewing product detials and current price
- View rating for the current product and a link to scroll to the ratings widget


**Related Products Widget:**

This widget contains 2 carousels:

Related Products Carousel:
- Displays all products related to the overview product
- Clicking on a related product will update the overview component
- Clicking on the star icon will compare that product to the product rendered in the overview
- The carousel loops
![alt_text](https://github.com/Tomorrow-Never-Dies/Front-End-Capstone/blob/main/screenshots/Related%20Items.png)

Your Outfit's Carousel:
- Displays products that the user has added to the my outfits carousel
- Contains an add item button which will add the product in the overview to the carousel.
- Also adds products from the overview star toggle button
- Clicking on a related product will update the overview component
- Each product can be removed from the carousel by clicking the x buton
![alt_text](https://github.com/Tomorrow-Never-Dies/Front-End-Capstone/blob/main/screenshots/Your%20outfits.png)

**Questions & Answers Widget:**
This widget displays Questions asked by curious shoppers and their respective answers.
At the moment, it will render all questions associated to the currently displayed item - this is rendered in a component that allows for scrolling.
With that said, the Questions & Answers widget allows for shoppers/customers to add questions to the currently selected item.

Features to be implemented: Add answers, adjustment of and sorting by Question/Answer "Helpfulness" and Question search

**Ratings and Reviews Widget:**
This widget displays the Ratings data and Reviews data coming from the Atlier API.
The current star rating only shows in 0.25% increments but can easily be changed to show 0.1% increments.
The user is able to filter reviews by helpfulness, relevance, and newest. On top of this, reviews can also be filtered out by star rating by clicking on the bar chart on the side of the reviews.
Users are able to upload images to the Atlier api and this is done by using imgbb API to get a url. This url is then sent to the Atlier api. Future enhancements would be showing a preview of the images that are uploaded.
Overall the main goal of this widget is to display the reviews data in a digestable format, and allow users to look through all the reviews and see a high level overview of the summary of all the reviews.

![alt text](https://github.com/Tomorrow-Never-Dies/Front-End-Capstone/blob/main/screenshots/Screen%20Shot%202023-01-07%20at%201.06.28%20PM.png)

![alt text](https://github.com/Tomorrow-Never-Dies/Front-End-Capstone/blob/main/screenshots/Screen%20Shot%202023-01-07%20at%201.06.45%20PM.png)

**Installation:**
To run Atelier, make sure you have Nodejs and npm installed on your machine. Then, clone the repository and navigate to the root directory. Run npm install to install all necessary dependencies, and then npm start to start the server. “npm run client-dev” will compile the react application. The app will be available at http://localhost:3033.

We hope you enjoy using Atelier! If you have any issues or suggestions, please don't hesitate to reach out.

**Team Members:**
* Andre Nga: Questions
* Yaser Eisa: Related Products
* Aman Arabi: Overview
* Andy Ma: Reviews
