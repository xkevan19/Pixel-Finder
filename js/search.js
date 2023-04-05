var dimensions = {
    "facebook cover size": {
        "dimension": "820 x 312 pixels",
        "image": "https://via.placeholder.com/820x312"
    },
    "facebook profile picture": {
        "dimension": "400 x 400 pixels",
        "image": "https://via.placeholder.com/400x400"
    },
    "facebook event cover photo": {
        "dimension": "1920 x 1005 pixels",
        "image": "https://via.placeholder.com/1920x1005"
    },
    "twitter header size": {
        "dimension": "1500 x 500 pixels",
        "image": "https://via.placeholder.com/1500x500"
    },
    "instagram reel dimensions": {
        "dimension": "1080 x 1920 pixels",
        "image": "https://via.placeholder.com/1080x1920"
    },
    "linkedin cover photo size": {
        "dimension": "1584 x 396 pixels",
        "image": "https://via.placeholder.com/1584x396"
    },
    "youtube channel art size": {
        "dimension": "2560 x 1440 pixels",
        "image": "https://via.placeholder.com/2560x1440"
    },
    "standard email newsletter size": {
        "dimension": "700 x 400 pixels wide",
        "image": "https://via.placeholder.com/700x400"
    }
};

const resultContainer = document.getElementById('result-container');

function searchDimensions(event) {
    if (event.type === "click" || event.key === "Enter") {
        var input = document.getElementById("searchInput").value.trim().toLowerCase();
        var result = dimensions[input];
        if (!result) {
            var bestMatch = findClosestMatch(input);
            if (bestMatch) {
                result = dimensions[bestMatch];
                resultContainer.innerHTML = "Did you mean <span>" + bestMatch + "</span>? The dimension for <span>" + bestMatch + "</span> is <span>" + result.dimension + "</span><br><img src='" + result.image + "'>";
            } else {
                resultContainer.innerHTML = "No dimensions found for <span>" + input + "</span>. Please try again.";
            }
        } else {
            resultContainer.innerHTML = "The dimension for <span>" + input + "</span> is <span>" + result.dimension + "</span><br><img src='" + result.image + "'>";
        }
        resultContainer.style.display = "block";
        var img = resultContainer.querySelector('img');
        img.style.maxWidth = '100%';
    }
}

// This function finds the closest match to the user input in the "dimensions" object line 4
function findClosestMatch(input) {

    // Initialize the best match and the best distance with null and Infinity, respectively
    var bestMatch = null;
    var bestDistance = Infinity;

    // Iterate through all the keys in the "dimensions" object
    for (var key in dimensions) {

        // Calculate the Levenshtein distance between the lowercase key and the user input
        var distance = levenshteinDistance(key.toLowerCase(), input);

        // If the distance is smaller than the current best distance, update the best match and the best distance
        if (distance < bestDistance) {
            bestMatch = key;
            bestDistance = distance;
        }
    }
    return bestMatch;
}
  
function levenshteinDistance(a, b) {
    // Check input for string before calling 'charAt method'
    if (typeof a !== 'string' || typeof b !== 'string') {
        return 0;
    }

    // The first two checks that the levenshteinDistance() function performs
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    // Initialize the matrix array
    var matrix = [];

    // Initialize the first column of the matrix
    for (var i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Initialize the first row of the matrix
    for (var j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution 
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j] + 1 // Deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}


document.getElementById("searchInput").addEventListener("keyup", searchDimensions);
document.getElementById("searchBtn").addEventListener("click", searchDimensions);