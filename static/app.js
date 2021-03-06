// Function to initialize page
function init() {

    // Read data and save Test Subject ID #s
    d3.json("data/samples.json").then(data => {
        var sample_names = data.names;
        console.log(sample_names)

        // Reference the HTML dropdown select element
        var option_selector = d3.select("#selDataset");

        // Append Test Subject ID #s to dropdown menu
        sample_names.forEach(ID => {
            option_selector.append("option").text(ID).property("value", ID);
        });

        // Call function to build initial charts for ID# 940
        charts(sample_names[0])

        // Call function to build metadatafor ID# 940
        metadata(sample_names[0])

    });

};

// Function to build charts using Test Subject ID #
function charts(ID) {

    // Read data
    d3.json("data/samples.json").then(data => {

        // Save list of samples
        var samples = data.samples;
        console.log(samples)

        // Filter list to one sample which has matching ID #
        var single_sample = samples.filter(bellybutton => bellybutton.id == ID)[0];
        console.log(single_sample)

        // Save values
        var sample_values = single_sample.sample_values;
        console.log(sample_values)

        // Save IDs
        var otu_ids = single_sample.otu_ids;
        console.log(otu_ids)

        // Save labels
        var otu_labels = single_sample.otu_labels;
        console.log(otu_labels)

        ///////////////
        // Bar chart //
        ///////////////

        // Trace for bar chart
        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `ID ${id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

        // Confirm correct bar chart values
        console.log(sample_values.slice(0, 10).reverse())
        console.log(otu_ids.slice(0, 10).reverse())
        console.log(otu_labels.slice(0, 10).reverse())

        // Convert trace1 object into array for plotting
        var data1 = [trace1];

        // Define the plot layout
        var layout1 = {
            title: "Individual Test Subject's Top 10 OTUs",
            xaxis: { title: "Sample Value" },
            yaxis: { title: "OTU ID #"}
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data1, layout1);

        //////////////////
        // Bubble chart //
        //////////////////
        // Found help from https://plotly.com/javascript/bubble-charts/
        
        // Trace for bar chart
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              size: sample_values
            }
        };
        
        // Convert trace2 object into array for plotting
        var data2 = [trace2];
        
        // Define the plot layout
        var layout2 = {
        title: "Belly Button Bacteria Samples",
        xaxis: { title: "OTU ID #" },
        yaxis: { title: "Sample Value"}
        };
        
        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot("myDiv", data2, layout2);
          
    });
};

// Function to build metadata using Test Subject ID #
function metadata(ID){

    // Read data
    d3.json("data/samples.json").then(data => {
        
        // Save list of metadata
        var metadata = data.metadata
        console.log(metadata)

        // Filter list to one individual's metadata, which has matching ID #
        var single_metadata = metadata.filter(bellybutton => bellybutton.id == ID)[0];
        console.log(single_metadata)

        // Reference the HTML metadata element
        var metadata_selector = d3.select("#sample-metadata");

        // Clear metadata
        metadata_selector.html("")

        // Append key-value pairs to HTML metadata element
        Object.entries(single_metadata).forEach(([key, value]) => {
            metadata_selector.append("h5").text(`${key}: ${value}`);
        });
    });
};

// On change to the DOM, call getData()
d3.select("#selDataset").on("change", update);

// Function called by DOM changes
function update() {
    
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");    
    var subject_id = dropdownMenu.property("value");
    console.log(subject_id)

    // Call function to build initial charts for ID# 940
    charts(subject_id)

    // Call function to build metadatafor ID# 940
    metadata(subject_id)

};


init();