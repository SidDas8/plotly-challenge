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

        // Call function to build initial chart for ID# 940
        charts(sample_names[0])

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
            yaxis: { title: "OTU ID #s"},
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data1, layout1);

        //////////////////
        // Bubble chart //
        //////////////////
        // Found help from https://plotly.com/javascript/bubble-charts/
        
        // Trace for bar chart
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
            mode: 'markers',
            marker: {
              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              size: [40, 60, 80, 100]
            }
        };
        
        var data = [trace1];
        
        var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        height: 600,
        width: 600
        };
        
        Plotly.newPlot('myDiv', data, layout);
          
    });
};

init();