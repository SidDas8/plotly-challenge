// Function to initialize page
function init() {

    // Read data and save ID #s
    d3.json("data/samples.json").then(data => {
        var sample_names = data.names;
        console.log(sample_names)

        // Reference the HTML dropdown select element
        var option_selector = d3.select("#selDataset");

        // Append Test Subject ID #s to dropdown menu
        sample_names.forEach(ID => {
            option_selector.append("option").text(ID).property("value", ID);
        });

    });

};

// Function to build charts
function charts() {


}

init();