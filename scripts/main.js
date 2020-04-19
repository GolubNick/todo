'use strict';
{
    class App {
        constructor(element) {
            this.element = element;
            console.log(this.element);
            this.titleInput = this.element.querySelector('#titleInput');
            this.descriptionInput = this.element.querySelector('#descriptionInput');
            this.prioritySelect = this.element.querySelector('#prioritySelect');
            this.cardsDataArray = [];
            this.cardsArray = [];
            this.init();
        }

        checkStorage(){
            let storageData = localStorage.getItem('todoCards');
            if (storageData) {
                this.cardsDataArray = JSON.parse(storageData);
                this.cardsDataArray.forEach(cardData => this.cardsArray.push(new Card(cardData)));
            }
        }

        attachEvents() {
            this.createButton.addEventListener('click',
                event => {
                    event.preventDefault();
                    let cardData = {
                        title: this.titleInput.value,
                        description: this.descriptionInput.value,
                        priority: this.prioritySelect.value
                    };

                    this.cardsArray.push(new Card(cardData));
                    this.addCardToLocalStorage(cardData);
                    this.clearForm();
                });
            this.editButton.addEventListener('click', event => {
                this.editedCardData.title = this.titleInput.value;
                this.editedCardData.description = this.descriptionInput.value;
                this.editedCardData.priority = this.prioritySelect.value;
                event.preventDefault();
                this.clearForm();
            });
        }

        addCardToLocalStorage(cardData) {
            let storageData = localStorage.getItem('todoCards');
            cardData.status = false;
            if (storageData){
                this.cardsDataArray = JSON.parse(storageData);
            }
            this.cardsDataArray.push(cardData);
            let stringifyCardsArray = JSON.stringify(this.cardsDataArray);
            localStorage.setItem('todoCards', stringifyCardsArray);
        }

        clearForm() {
            this.titleInput.value = '';
            this.descriptionInput.value = '';
            this.prioritySelect.value = 'Low';
        }

        updateCard(cardData) {
            this.editedCardData = cardData;
            this.fillForm(cardData);
        }

        getAppElements() {
            this.createButton = this.element.querySelector('#createButton');
            this.editButton = this.element.querySelector('#editButton');
        }

        fillForm(cardData) {
            this.titleInput.value = cardData.title;
            this.descriptionInput.value = cardData.description;
            this.prioritySelect.value = cardData.priority;

            this.createButton.style.display = 'none';
            this.editButton.style.display = 'block';
        }

        init() {
            this.getAppElements();
            this.attachEvents();
            this.checkStorage();
            console.log(this.cardsArray);
            console.log(this.cardsDataArray);
        }
    }

    class Card {
        constructor(cardData) {
            this.cardData = cardData;
            this.priorityCard= cardData.priority;
            this.cardsBlock = document.querySelector('#cardsBlock');
            this.card = document.createElement('div');
            this.init();
        }

        attachEvents(){
            let deleteCardWrapper = this.deleteCard.bind(this);
            this.deleteButton.addEventListener('click', deleteCardWrapper);

            let editCardWrapper = this.editCard.bind(this);
            this.editButton.addEventListener('click', editCardWrapper);
        }

        deleteCard() {
            let cardIndex = app.cardsDataArray.indexOf(this.cardData);
            app.cardsDataArray.splice(cardIndex, 1);
            let stringifyCardsArray = JSON.stringify(app.cardsDataArray);
            localStorage.setItem('todoCards', stringifyCardsArray);
            this.cardsBlock.removeChild(this.card);
        }

        editCard() {
            app.updateCard(this.cardData);
        }

        createCard(cardData) {
            this.card.classList.add('card');

            let cardHTML = `<div class="card-body">
                <span class="badge ${this.priorityClass}">${cardData.priority}</span>
                <h5 class="card-title">${cardData.title}</h5>
                <p class="card-text">${cardData.description}</p>
                <a href="#" class="btn btn-primary complete-button">Complete</a>
                <a href="#" class="btn btn-info edit-button">Edit</a>
                <a href="#" class="btn btn-danger delete-button">Delete</a>
            </div>`
            this.card.innerHTML = cardHTML;
            this.cardsBlock.append(this.card);
        }

        get priorityClass () {
            switch (this.priorityCard) {
                case 'High':
                    return 'badge-danger';
                    break;
                case 'Medium':
                    return 'badge-warning';
                    break;
                case 'Low':
                    return 'badge-success';
                    break;
            }
        }

        getCardElements() {
            this.deleteButton = this.card.querySelector('.delete-button');
            this.editButton = this.card.querySelector('.edit-button');
            this.completeButton = this.card.querySelector('.complete-button');
        }

        init() {
            this.createCard(this.cardData);
            this.getCardElements();
            this.attachEvents();
        }
    }

    let appElement = document.querySelector('#app');
    let app = new App(appElement);

}