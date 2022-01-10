class Animal {

    static animals = []; //17 ex statinis masyvas. cia saugomi visi animalai
    static showAnimals = []; //visi rodomi gyvuliai 
    static filterSet;

    element; // nuoroda i html taga su animalu

    static start() { //23
        this.hideModal('confirm-delete');
        this.hideModal('edit');
        this.buttonCreate();
        this.buttonHideModal();
        this.buttonEdit();
        this.buttonConfirmDelete();
        this.buttonSort();
        this.buttonFilter();
        this.buttonShowAll();
        // Animal.createAnimal('Lion', '90', 'Orange', false);
        // Animal.createAnimal('Zebra', 150, 'White-Black', false);
        // Animal.createAnimal('Hippo', 50, 'Brown-Grey', false);
        // Animal.createAnimal('Giraffe', 100, 'Chestnut', true);
        // Animal.createAnimal('Lemur', 40, 'Dark-Brown', false);
        // Animal.createAnimal('Horse', 120, 'orange', false);
        // Animal.createAnimal('Cow', 100, 'grey', true);
        // Animal.createAnimal('moose', 100, 'mixed brown', true);
        // Animal.createAnimal('Aurochs', 120, 'dark-wood', true);
        this.load();
    }

    static deleteAnimal(id) {
        this.animals.forEach((animal, index) => {
            if (id == animal.id) {
                this.clearZoo();
                this.animals.splice(index, 1);
            }
        });
        this.save();
        this.renderZoo();
    }

    static editAnimal(id, specie, tail, color, horn) {
        this.animals.forEach(animal => {
            if (id == animal.id) {
                this.clearZoo();
                animal.specie = specie;
                animal.tail = tail;
                animal.color = color;
                animal.horn = horn;
            }
        });
        this.save();
        this.renderZoo();
        this.hideModal('edit');
    }

    static createAnimal(specie, tail, color, horn) { //18ex statinis metodas
        this.clearZoo(); //22 is html istrina visus animalus  
        this.animals.unshift(new Animal(specie, tail, color, horn)); //vietoje push rasome unshift, kad naujus detu i pradzia
        this.save();
        this.renderZoo(); //22 is naujo sudedame visus animalus i html 
    }

    static save() {
        const data = [];
        this.animals.forEach(animal => {
            data.unshift({ //vietoj unshift galima push
                specie: animal.specie,
                tail: animal.tail,
                color: animal.color,
                horn: animal.horn,
            })
        });
        localStorage.setItem('zooApp', JSON.stringify(data)); //28 padarom JSON stringa
        this.makeFilterSet();
    }

    static load() {
        if (null === localStorage.getItem('zooApp')) { //tikrina ar localstorage yra tuscias, jei tuscias tai sukuria nauja masyva, kad forEach turetu ka forEachint
            localStorage.setItem('zooApp', JSON.stringify([]));
        }
        JSON.parse(localStorage.
            getItem('zooApp')).
            forEach(animal => this.createAnimal(animal.specie, animal.tail, animal.color, animal.horn));
    }

    static renderZoo() { //20
        this.animals.forEach(animal => animal.render());
        this.filterSelect(); //????
    }

    static clearZoo() {
        document.querySelector('#cont-1111-left').innerHTML = '';
        this.clearFilterSelect();
    }

    static showEditModal(animal) {
        const modal = document.querySelector('#edit');
        modal.style.display = 'block';
        modal.style.opacity = 1;
        modal.querySelector('#button-save').dataset.id = animal.id;

        const specie = document.querySelector('#edit .specie');
        const tail = document.querySelector('#edit .tail');
        const color = document.querySelector('#edit .color');
        const horn = document.querySelector('#edit .horn');

        specie.value = animal.specie;
        tail.value = animal.tail;
        color.value = animal.color;
        horn.value = animal.horn;
    }

    static showDeleteConfirmModal(id) {
        const modal = document.querySelector('#confirm-delete');
        modal.style.display = 'block';
        modal.style.opacity = 1;
        modal.querySelector('#button-yes').dataset.id = id;
    }

    static showSorted(id) {
        const dir = document.querySelector('#radio-sort-asc').checked ? 1 : -1;
        if ('button-sort-specie' == id) {
            this.animals.sort(function (a, b) {
                let nameA = a.specie.toUpperCase();  //ignore lower and upper case
                let nameB = b.specie.toUpperCase(); //ignore lower and upper case
                if (nameA < nameB) {
                    return -dir;
                }
                if (nameA > nameB) {
                    return dir;
                }
                //names must be equal
                return 0;
            });
        }
        if ('button-sort-tail' == id) {
            this.animals.sort(function (a, b) {
                return dir * (a.tail - b.tail);
            });
        }
        this.clearZoo();
        this.renderZoo();
    }

    static showFiltered() {
        const filterValue = document.querySelector('#select-filter-property').value;
        const an = [];
        this.animals.forEach((animal, i) => {
            if (animal.specie == filterValue) {
                an.push(animal);
            }
        });
        this.animals = an;
        this.clearZoo();
        this.renderZoo();
        document.querySelectorAll('#animals button').forEach(b => b.setAttribute('disabled', true));//#animals button??? o kaip pas mane?
    }

    static rerender = () => {
        this.clearZoo();
        this.rerenderZoo();
    }


    static makeFilterSet() {
        this.filterSet = new Set();
        this.animals.forEach(animal => this.filterSet.add(animal.specie));
        this.filterSet = new Set([...this.filterSet].sort());
    }

    static filterSelect() {
        if (undefined === this.filterSet) {
            return;
        }
        const select = document.querySelector('#select-filter-property');
        this.filterSet.forEach(a => {
            const element = document.createElement('option');
            element.innerText = a; //a yra ivairove: karve, zuikis, raganosis
            element.value = a;
            select.appendChild(element);
        });
    }

    static clearFilterSelect() {
        document.querySelector('#select-filter-property').innerHTML = '';
    }

    static hideModal(id) {
        const modal = document.querySelector('#' + id);
        modal.style.display = 'none';
        modal.style.opacity = 0;
        delete modal.querySelector('.modal-close').dataset.id;
    }

    static buttonCreate() { //22
        const specie = document.querySelector('#create .specie');
        const tail = document.querySelector('#create .tail');
        const color = document.querySelector('#create .color');
        const horn = document.querySelector('#create .horn');
        document.querySelector('#button-create').addEventListener('click', () => this.createAnimal(specie.value, tail.value, color.value, horn.checked)); //22 in sukuriame nauja animala
    }

    static buttonEdit() {
        const specie = document.querySelector('#edit .specie');
        const tail = document.querySelector('#edit .tail');
        const color = document.querySelector('#edit .color');
        const horn = document.querySelector('#edit .horn');
        document.querySelector('#button-save').addEventListener('click', (e) => this.editAnimal(e.target.dataset.id, specie.value, tail.value, color.value, horn.checked));
    }

    static buttonConfirmDelete() {
        document.querySelector('#button-yes').
            addEventListener('click', (e) => {
                this.deleteAnimal(e.target.dataset.id);
                this.hideModal('confirm-delete');
            });
    }

    static buttonHideModal() {
        document.querySelectorAll('[data-dismiss=modal]').forEach(b => b.addEventListener('click', (e) => this.hideModal(e.target.closest('.modal').id)));
    }

    static buttonSort() {
        document.querySelectorAll('#button-sort-specie, #button-sort-tail').forEach(b => {
            b.addEventListener('click', e => this.showSorted(e.target.id));
        });
    }

    static buttonFilter() {
        document.querySelector('#button-filter').addEventListener('click', (e) => this.showFiltered());
    }

    static buttonShowAll() {
        document.querySelector('#button-filter-showAll').addEventListener('click', (e) => {
            this.animals = [];
            this.load();
        });
    }


    // ------------------------------------------------------------------------------------------------------

    constructor(specie, tail, color, horn) {
        this.specie = specie;
        this.tail = tail;
        this.color = color;
        this.horn = horn;
        this.createAnimalRandom();
    }

    render() { //19
        this.createAnimalElement();
        this.createAnimalHtml();
        this.deleteButton();
        this.editButton();
    }

    createAnimalElement() {
        this.element = document.createElement('div');
        this.element.classList.add('cont-new-animal');
        document.querySelector('#cont-1111-left').appendChild(this.element);
    }

    createAnimalHtml() {
        const horns = this.horn ? 'YES' : 'NO';
        const html = `
            <h2 class='specie'>Specie: ${this.specie}</h2>
            <h2 class='items tail'>Tail length,cm: ${this.tail}</h2>
            <h2 class='items color'>Color: ${this.color}</h2>
            <h2 class='items horn'>With Horns? ${horns}</h2>
            <div id='buttons'>
            <button type='button' id='button-edit'>Edit</button>
            <button type='button' id='button-delete'>Delete</button>  
            <div>
            `;
        this.element.innerHTML = html;
    }

    createAnimalRandom() {
        this.id = Math.floor(Math.random() * 9000000) + 1000000;
    }

    editButton() { //24
        this.element.querySelector('#button-edit').addEventListener('click', () => this.constructor.showEditModal(this));
    }

    deleteButton() { //24 
        this.element.querySelector('#button-delete').addEventListener('click', () => this.constructor.showDeleteConfirmModal(this.id));
    }


};

Animal.start(); //vienintele bus eilute isoreje