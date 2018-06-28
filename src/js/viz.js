// Load html-template
import mainTemplate from "./../templates/mainTemplate";

/**
 * class containing all the databaseredaktion-fun
 */
export default class viz {
    /**
     * Initialize the viz-component.
     */
    constructor(txt, data) {
        this.txt = txt;
        this.data = data;

        this.template = new mainTemplate();

        // indsæt html
        this.topElem = window.document.getElementById("databaseRedInteractive");
        this.topElem.innerHTML = this.template.render(this.txt, this.data);

        // set element
        this.searchBar = document.querySelector("#searchBar");

        // set events - outer
        let lst2 = this.topElem.querySelectorAll("h3");
        for (let i = 0; i < lst2.length; i++) {
            lst2[i].addEventListener("click", function (ev) {
                // The clicked element
                let elem = ev.target;
                this.showHide(elem);
            }.bind(this));
        }

        // set events
        this.searchBar.addEventListener("input", this.showSearchResult.bind(this));

        // Create search-index
        this.searchIndex = this.createIndex(this.data);
    }

    showHide(elem) {
        // Move to sibling
        if (elem.tagName == "INPUT") {
            elem = elem.parentElement.nextSibling;
        } else {
            elem = elem.nextSibling;
        }

        // Toggle class
        if (elem.classList.contains("topDiv")) {
            elem.classList.toggle("topDiv");
            elem.classList.toggle("topOpen");
        } else if (elem.classList.contains("topOpen")) {
            elem.classList.toggle("topClosed");
            elem.classList.toggle("topOpen");

            // Close all inner-elements, when the outer closes
            let t = elem.querySelectorAll(".foldedDown");
            for (let x = 0; x < t.length; x++) {
                t[x].classList.remove("foldedDown");
                t[x].classList.add("topLi");
            }
            t = elem.querySelectorAll(".foldedUp");
            for (let x = 0; x < t.length; x++) {
                t[x].classList.remove("foldedUp");
                t[x].classList.add("topLi");
            }
        } else {
            elem.classList.toggle("topClosed");
            elem.classList.toggle("topOpen");
        }
    }

    showSearchResult() {
        let matches = [];
        // Get search-box-value
        let searchPhrase = this.searchBar.value.trim().toLowerCase();
        if (searchPhrase != "") {
            // Get results
            let phrases = searchPhrase.split(" ");
            let first = true;

            // Go through search-phrases
            for (let i = 0; i < phrases.length; i++) {
                let arrayToUse = null;
                if (first) {
                    first = false;
                    arrayToUse = this.searchIndex;
                } else {
                    arrayToUse = matches;
                    matches = [];
                }

                // iterate
                for (let x = 0, len = arrayToUse.length; x < len; x++) {
                    // a match?
                    if (arrayToUse[x][1].indexOf(phrases[i]) > -1) {
                        matches.push(arrayToUse[x]);
                    }
                }
            }

            // sort
            if (matches.length > 0) {
                matches.sort(function(a,b) {
                    return this.compareFct(a[1], b[1]); 
                }.bind(this));
            }
        }

        // Show only 50 elements
        //matches = matches.slice(0,50);

        // render
        let content = "";
        if (matches.length > 0) {
            content += this.template.searchHead(this.txt);
            content += this.template.searchResultTemplate(matches, this.txt);
            document.querySelector("#searchResults").innerHTML = content;
            // show
            this.searchBar.nextSibling.classList.remove("topDiv");
            this.searchBar.nextSibling.classList.add("topOpen");
        } else {
            // is search-element empty
            if (this.searchBar.value.trim() == "") {
                document.querySelector("#searchResults").innerHTML = content;
                // hide
                this.searchBar.nextSibling.classList.add("topDiv");
                this.searchBar.nextSibling.classList.remove("topOpen");
            } else {
                // Write "no result"
                content += this.template.searchEmpty(this.txt);
                document.querySelector("#searchResults").innerHTML = content;
                // show
                this.searchBar.nextSibling.classList.remove("topDiv");
                this.searchBar.nextSibling.classList.add("topOpen");
            }
        }
    }

    showSearch(){
    }

    // Create search-index
    createIndex(d) {
        // Create holder
        let result = [];
        // Iterate through institutions
        let k = Object.keys(d);
        for (let i = 0; i < k.length; i++) {
            let lst = d[k[i]];
            for (let x = 0; x < lst.length; x++) {
                let e = [];
                let navn = lst[x].n;
                e.push(lst[x]);
                e.push(navn.toLowerCase());

                result.push(e);
            }
        }

        return result;
    }

    compareFct(a, b) {
        if (isNaN(a)) {
            if (isNaN(b)) {  // a and b are strings
                return a.localeCompare(b, 'da');
            } else {         // a string and b number
                return 1;  // a > b
            }
        } else {
            if (isNaN(b)) {  // a number and b string
                return -1;  // a < b
            } else {         // a and b are numbers
                return a - b;
            }
        }
    }
}