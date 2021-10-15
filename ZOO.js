/*
1. Sukurti klasę Animal
2. konstruktoriuje pridėti savybių: specie, tail, color, horn
3. sukurti keturis žvėrių objektus ir juos sudėti į vieną masyvą.
4. Į konstruktorių įdėkite console.log su animalo rūšimi
5. Sukurkite createAnimalElement metodą, kuris sukuria naują DIV elementą ir jį įdeda į DOM'ą (htmlą)
6. Nuorodą į tą elementą užsaugokite naujai sukurtoje savybėje element
7. createAnimalElement įdėkite į konstruktorių ir paleiskite jame
8. sukurti metodą animalHtml, kuriame sudėliojame animalo apraš htmlą
9. aprašą įdėti su innerHTML į sukurtą savybę element div tagu
10. paleisti padarytą metodą konstruktoriuje
11 htmle nusipaišyt formą su 3 inputais ir vienu mygtuku. Type text, o prasmė 4 animalo savybės
12. Ketvirtas input checkbox pasirinkimas dėl uodegos
13. Paspaudus mygtuką, turi susikurti naujas gyvūnas 
    ir įsirašyti į masyvą, prie kitų
14. sukurti metodą kuris generuotų atsitiktinius skaičius nuo 1000000 iki 9999999 ir priskirti tą skaičių savybei id, ir pasileistų konstruktoriuje
15. Aštuntą punktą papildyti mygtuku 'istrinti'
16. Mygtukui pridėti atributą data-id="" animal id savybei
17. Masyvą paversti statine savybe, kuri vadintųsi animals
18. Sukurti statini metodą createAnimal su keturiais argumentais, kuris gamintų Animal objektą ir dėtų jį į statinę savybę animals
19. sukurti objektiną metoda render() ir į jį iš konstruktoriaus perkelti 
    this.createAnimalElement();  this.createAnimalHtml();
20. Sukurti statinį metodą renderZoo, kuris atvaizduotų visus sukurtus gyvūnus iš statinės savtbės-masyvo animals
21. Sukurti statinį metodą clearZoo() kuris ištrintų visus žvėris iš DOM HTML, bet ne iš masyvo animals
22. buttono create animal eventą perkelti į statinį metodą buttonCreate()
23. sukurti statinį metodą start() kuriame paleisti buttonCreate() metodą
24. sukurti metoda deleteButton kuris ant animalo delete mygtuko uždeda click eventą. 
eventas paleidžia metodą (dar nesukurtą) deleteAnimal. deleteAnimal -- statinis metodas
25. masyve animals surasti objektą kurio id yra lygus id argumentui ir atspausdinti indeksą
26. sukurti statinį metodą save. metode sukurti naują tuščią masyvą. [20:28] Arvydas Kijakauskas (Dėstytojas)
    į tą masyvą irašyti objektus, turinčius keturias pagrindidines savybes iš kiekvieno animals masyve esančio objekto
27. sukurti statinį metodą save. metode sukurti naują tuščią masyvą.  į tą masyvą irašyti objektus, turinčius keturias pagrindidines savybes iš kiekvieno animals masyve esančio objekto
28. gautą masyvą sustringifaiinti ir įdėti į localstorage su raktu zooApp
29. sukurti statinį metodą load, kuris iš localstorage nuskaito duomenis ir juos suparsina
30. iš gauto išparsinto masyvo prigaminti naujų Animal objektų naudojant metodą createAnimal
31. sukurti editButton metodą ir į jį įdėti evetą click, kurį paspaududus yra iškviečiams statinis metodas showEditModal
32. edit buttono metodo paleidimą idedame į render metodą
33. Atvaizduojame Edit modalą su užpildytais laukeliais
34. sukurti delete patvirtinimo modala
35. Html pasigaminti du mygtukus ir du radio elementus rūšiavimo krypčiai. vienas pagal vardą kitas pagal uodegos ilgį
36. Sukuri statinį metodą sortButton kurie ant abiejų mygtukų uždeda click eventą, kuriam nutikus pasileidžia statinis 
    metodas showSorted(id) ir jam yra perduodamas paspausto 
    mygtuko id. sortButton metodą paleisti start metode
37. pildyti showSorted metodą: pagal id išrūšiuoti masyvą, tada paleisti static clearZoo() ir tada renderZoo()
38. uodegas rūšiuotų į abi puses, priklausomai nuo radio buttonų
39. Htmle padaryti selektą inputą ir du mygtukus: filtruoti ir rodyti visus
40. Sukurti statinį metodą makeFilterSet, kuris iš static 
    animals masyvo pagamintų Set tipo objektą su animalų 
    spieciem ir įrašytų jį į statinę savybę filterSet
41. metodą makeFilterSet() iškviesti load() ir 
    save() metodų pabaigose
42. makeFilterSet metodą patobulinti taip, kad jame soiece 
    stringai būtų išdėlioti pagal abėcėlę
43. sukurti statinį metodą filterSelect, kuris iš savybės 
    Set'o filter set pagamintų <option> htmlus ir juos įdėtų 
    į selecta filtravimui. kiekvieno <option> value = spiece 
    stringui
44. sukurti clearFilterSelect statinį metodą, kuris iš select 
    elementų pašalintų visus option elementus
45. metode renderZoo paleisti metodą filterSelect, o metode 
    clearZoo paleisti metodą clearFilterSelect
46. Padaryti statinį metodą filterButton kuriame būtų click eventas 
    ir jį paspaudus pasileistų statinis metodas showFiltered
47. Padaryti statinį metodą showFiltered, kuris ištrintų visus 
    nepaselektintus gyvulius pagal vardą iš static animals masyvo 
    ir paleisti clearZoo ir renderZoo metodus
48. Nepamirštame filterButton užregistruoti starte
49. sukuriame statinį metodą shoAllButton su click eventu, 
    kuris paleidžia load() metodą.
50. showAllButton užregistruoti starte.

*/


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