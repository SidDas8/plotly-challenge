// Function to initialize page
function init() {

    // Read data and save names
    d3.json("../data/samples.json").then((data) => {
        var sample_names = data.names;
        console.log(sample_names)

        // Reference the HTML dropdown select element
        var option_selector = d3.select("#selDataset");

        // Append names to dropdown menu
        
    





    })
  }
init()