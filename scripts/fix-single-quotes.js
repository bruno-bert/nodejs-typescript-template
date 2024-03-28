/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

// Function to replace &#x27; with single quotes
function replaceSingleQuotes(content) {
  return content.replace(/&#x27;/g, "'")
}

// Function to recursively read directory and process files
function processDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file)

      // Check if file is a directory
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error getting file stats for ${filePath}:`, err)
          return
        }

        if (stat.isDirectory()) {
          // Recursively process subdirectory
          processDirectory(filePath)
        } else {
          // Process file if it contains "schema" in its name
          if (file.includes('schema')) {
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.error(`Error reading file ${filePath}:`, err)
                return
              }

              // Replace &#x27; with single quotes
              const modifiedContent = replaceSingleQuotes(data)

              // Write modified content back to the same file
              fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
                if (err) {
                  console.error(`Error writing file ${filePath}:`, err)
                  return
                }
                console.log(`File ${filePath} has been modified and saved.`)
              })
            })
          }
        }
      })
    })
  })
}

// Start processing the directory recursively
const directoryPath = './src/usecases'
processDirectory(directoryPath)
