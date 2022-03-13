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

        // Call function to build initial chart for ID# 940
        charts(sample_names[0])

    });

};

// Function to build charts
function charts(ID) {

    // Read data
    d3.json("data/samples.json").then(data => {

        // Save all samples
        var samples = data.samples
        console.log(samples)

        // Filter samples to one sample
        var single_sample = samples.filter(bellybutton => bellybutton.id == ID)[0];
        console.log(single_sample)


    })
}

init();