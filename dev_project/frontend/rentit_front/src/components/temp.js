
const Filevalidation3 = (file1,name) => {
  
 
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 3072) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('photo3',file1);
              setreview({...myreview,file3: URL.createObjectURL(file1),photo3:file1});
            }
        
    
  }
  
  const Filevalidation2 = (file1,name) => {
    
   
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 3072) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('photo2',file1);
              setreview({...myreview,file2: URL.createObjectURL(file1),photo2:file1});
            }
        
    
  }
  
  const Filevalidation1 = (file1,name) => {
    
   
    // Check if any file is selected.
    
       
  
            const fsize =file1.size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 3072) {
                alert(
                  "File too Big, please select a file less than 5mb");
            } 
            else{
              
              formik.setFieldValue('photo1',file1);
              setreview({...myreview,file1: URL.createObjectURL(file1),photo1:file1});
            }
        
    
  }
  