window.onload = function() {
    let bodyTag = document.querySelector('body');
    const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick',
        'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem',
        'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter',
        'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester',
        'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar',
        'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra',
        'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken',
        'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank',
        'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'
    ];
    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const filteredResult = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
    // bodyTag
    createInventorTable(bodyTag, "List of inventors born who were born in the 1500's", "filter-data");
    fillInventorTable(".filter-data", filteredResult);
    console.table(filteredResult);
    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
    const mappedResult = inventors.map(
        inventor => {
            return {
                "first": inventor.first,
                "last": inventor.last
            }
        });
    createInventorTable(bodyTag, "List of inventors with only first name and last name", "map-data");
    fillInventorTable(".map-data", mappedResult, [{
            data: "first",
            title: "First name"
        },
        {
            data: "last",
            title: "Last name"
        }
    ]);
    console.table(mappedResult);
    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    const sortedResult = inventors.slice(0).sort(function(a, b) {
        return a.year - b.year;
    });
    createInventorTable(bodyTag, "Inventors sorted by their birth year", "sorted-data");
    fillInventorTable(".sorted-data", sortedResult);
    console.table(sortedResult);

    // Array.prototype.reduce()
    // 4. How many years did all the inventors live in total?
    let totalYears = inventors.reduce((total, inventor) => total + (inventor.passed - inventor.year), 0);
    console.log(totalYears);
    // 5. Sort the inventors by years lived
    const sortInventorsByAge = inventors.slice(0).sort((a, b) => (b.passed - b.year) - (a.passed - a.year));
    createInventorTable(bodyTag, "Inventors sorted by their age", "sorted-by-age-data");
    fillInventorTable(".sorted-by-age-data", sortInventorsByAge);
    console.table(sortInventorsByAge);

    // 6. sort Exercise
    // Sort the people alphabetically by last name
    const peopleSortedByLastName = people.sort((firstPerson, lastPerson) => {
        const [lastFP, firstFP] = firstPerson.split(', ');
        const [lastLP, firstLP] = lastPerson.split(', ');
        return firstFP > firstLP ? 1 : -1;
    });
    console.table(peopleSortedByLastName);
    // 7. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike',
        'walk', 'car', 'van', 'car', 'truck'
    ];
    const transportation = data.reduce(function(obj, item) {
        if (!obj[item]) {
            obj[item] = 0;
        }
        ++obj[item];
        return obj;
    }, {});
    console.log(transportation);
}

function createInventorTable(source, headerContent, tableClassName) {
    let header = document.createElement('header');
    header.textContent = headerContent;
    header.className = "table-title";
    let table = document.createElement('table');
    table.style.cssText = "width:100%;";
    table.className = "display " + tableClassName;
    source.appendChild(header);
    source.appendChild(table);
}

function fillInventorTable(selector, data, columns) {
    if (!columns) {
        columns = [{
                data: "first",
                title: "First name"
            },
            {
                data: "last",
                title: "Last name"
            },
            {
                data: "year",
                title: "Birth"
            },
            {
                data: "passed",
                title: "Death"
            }
        ];
    }
    $(selector).DataTable({
        data: data,
        columns: columns,
        // Turn off the default sorting
        bSort: false,
        // No pagination
        paging: false
    });
}