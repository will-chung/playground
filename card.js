class Card extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({mode: 'open'});

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './font/bootstrap-icons.css');

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const top = document.createElement('div');
        top.setAttribute('class', 'card-top');
        const bottom = document.createElement('div');
        bottom.setAttribute('class', 'card-bottom');
        card.append(top,bottom);

        const menu = document.createElement('div');
        menu.setAttribute('class', 'card-menu');
        const menuIcon = document.createElement('i');
        menuIcon.setAttribute('class', 'bi bi-three-dots-vertical');
        menuIcon.setAttribute('style', 'font-size: 30px');
        menu.append(menuIcon);
        top.append(menu);

        const content = document.createElement('div');
        content.setAttribute('class', 'card-content');
        content.textContent = 'Spring Quarter 2021'
        bottom.append(content);

        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: absolute;
                width: 350px;
                height: 400px;
                top: 100px;
                left: 100px;

                box-shadow: 0 2px 5px rgb(0 0 0 / 30%);
                border-radius: 4px;
            }

            .card-top {
                position: absolute;
                width: 100%;
                height: 50%;
                border-radius: 4px 4px 0px 0px;
                background: red;
            }   
            
            .card-bottom {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                width: 100%;
                height: 50%;
                bottom: 0px;
            }

            .card-menu {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 50px;
                height: 50px;
                top: 10px;
                left: 85%;
            }

            .card-content {
                width: 95%;
                height: 95%;
                padding-top: 35px;
                padding-left: 27.5px;
            }
        `;

        // attach the created elements to the shadow DOM
        this.shadowRoot.append(link,card,style);
    }
}

customElements.define('card-navigation', Card);