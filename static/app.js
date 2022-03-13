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

        // Save list of samples
        var samples = data.samples;
        console.log(samples)

        // Filter list to one sample
        var single_sample = samples.filter(bellybutton => bellybutton.id == ID)[0];
        console.log(single_sample)

        // Save values
        var sample_values = single_sample.sample_values
        console.log(sample_values)

        // Save IDs
        var otu_ids = single_sample.otu_ids
        console.log(otu_ids)

        // Save labels
        var otu_labels = single_sample.otu_labels
        console.log(otu_labels)

        // Trace1 for bar chart
        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `ID ${id}`),
            text: otu_labels.slice(0, 10),
            type: "bar",
            orientation: "h"
        };

        // Convert trace1 object into array for plotting
        var data1 = [trace1]
        // console.log(sample_values.slice(0, 10).reverse())
        // console.log(otu_ids.slice(0, 10).reverse())
        // console.log(otu_labels.slice(0, 10).reverse())

        // Apply the group bar mode to the layout
        var layout = {
            title: "OTUs Found"
        };


        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data1, layout);
        // Trace2 for bubble chart

    });
};

init();