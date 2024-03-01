const { readFile, writeFile,appendFile,rename,unlink } = require('fs'); // destructing method -used for callback implementation
const fsPromises = require('fs').promises; // extract the promises property alone -used for async-await implementation
const fs = require('fs'); // require the entire fs -used for Streams
const path = require('path');

// ===============================================================================================
// Working with Directories - creation and removal
// ==============================================================================================
if (!fs.existsSync('./files')){
   fs.mkdir('./files', err =>{
      if (err) throw err
      console.log('directory created')
   })
}
if (fs.existsSync('./files')){
   fs.rmdir('./mytxtfiles', err => {
      if (err) throw err
      console.log('directory removed')
   })
}


// ===============================================================================================
// Handling streams
// ==============================================================================================
const rdStream = fs.createReadStream('./files/lorem.txt', {encoding:'utf-8'})
const wrtStream = fs.createWriteStream('./files/new-lorem.txt')

rdStream.on('data', (datachunk) =>{
   wrtStream.write(datachunk)
})

rdStream.pipe(wrtStream) // better performance than using the 'on' method above


// ===============================================================================================
// Using async await for basic file operations
// ==============================================================================================
const fileOperations = async() =>{
   try {
      const data = await fsPromises.readFile(path.join(__dirname,'files', 'myfileawait.txt'), 'utf-8')
         console.log(data)

         await fsPromises.unlink(path.join(__dirname,'files', 'myfileawait.txt'))
            console.log('deletefile async complete')

         await fsPromises.writeFile(path.join(__dirname, 'files','replyfileawait.txt'), data , {flag:'a'}) 
            console.log('writefile async complete')
            
         await fsPromises.appendFile(path.join(__dirname, 'files','replyfileawait.txt'), '\nit\'s really fun...')
           console.log('appendfile async complete')
        
         await fsPromises.rename(path.join(__dirname, 'files','replyfileawait.txt'),  path.join(__dirname, 'files','responsefileawait.txt'))
            console.log('renamefile async complete')

         const newdata = await fsPromises.readFile(path.join(__dirname,'files', 'responsefileawait.txt'), 'utf-8')
         console.log(newdata)
      
   } catch (error) {
      console.error(error)
   }

}  
fileOperations()

// ===============================================================================================
// Using callbacks for basic file operations - leading to callback hell
// ===============================================================================================
   readFile(path.join(__dirname,'files', 'myfile.txt'), 'utf-8', (err,data) =>{
   if(err) throw err;
   console.log('readfile callback complete')
   
   writeFile(path.join(__dirname, 'files','replyfile.txt'), data , {flag:'a'}, (err,data) =>{
      if(err) throw err;
      console.log('writefile callback complete')
      
   unlink(path.join(__dirname,'files', 'myfile.txt'), (err,data) =>{
      if(err) throw err;
      console.log('deletefile callback complete')

    appendFile(path.join(__dirname, 'files','replyfile.txt'), '\nit\'s fun...' , (err,data) =>{
     if(err) throw err;
     console.log('appendfile callback complete')
  
     rename(path.join(__dirname, 'files','replyfile.txt'),  path.join(__dirname, 'files','responsefile.txt'), (err,data) =>{
      if(err) throw err;
      console.log('renamefile callback complete')
      })
     })
    })
   })
  })

// //   caters for uncaught errors
  process.on('uncaughtException', err =>{
   console.log(`something happened: ${err}`);
   process.exit(1);
})
// ******* program output *******************
// $ node testing
// it's fun learning node.js
// readfile callback complete
// deletefile async complete
// writefile callback complete
// writefile async complete
// deletefile callback complete
// appendfile async complete
// appendfile callback complete
// renamefile async complete
// renamefile callback complete
// it's fun learning node.js
// it's really fun...

// ===============================================================================================
// ===============================================================================================
// const { readFile, writeFile } = require('fs');
// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const { readFile, writeFile } = require('fs').promises;

// // async function simple_async() {}
// const simple_async = async() => {
//     try{
//     const first = await readFile('./files/firstfile.txt','utf8');
//     const second = await readFile('./files/secondfile.txt', 'utf8');
//     await writeFile('./files/first_second.txt', 
//                     `\nNICE ATTEMPT with promises\n${first} ${second}`,
//                     {flag: 'a'}
//                     );
//  }
//  catch(error){
//     console.log(error);
//  }
//  }
//  simple_async();


// const res = (path) => {
//     return new Promise(function (resolve, reject) {
//         readFile(path, 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         })
//     })
// }

// const first = res('./files//firstfile.txt')
//     .then(function (message) {
//         console.log(message)
//     })
//     .catch(function (error) {
//         console.log(error)
//     })

// *****************  node console practice ************
// console.log(global)

// const os = require('os');
// const path = require('path');
// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(__dirname)
// console.log(__filename)
// console.log(path.parse(__filename))



 