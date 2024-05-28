const mysql = require("mysql");

//MySQL
const connectn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  //Check database conncection
  connectn.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM `student management`",(err,rows)=>{
        connection.release();
        if(!err){
            // console.log("Good");
            res.render("home",{rows});

        }else{
            console.log("Error in Lisiting Data"+err);
        } 
    });
    
  });
};
// Add user
exports.adduser=(req,res)=>{
    res.render("adduser");
};

exports.save=(req,res)=>{
    connectn.getConnection((err, connection) => {
        if (err) throw err;
        const {name,age,city}=req.body;
        connection.query("INSERT INTO `student management`( `Name`, `Age`, `City`) VALUES (?,?,?)", [name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                // console.log("Good");
                res.render("adduser",{message:"New student added successfully!"});
    
            }else{
                console.log("Error in Lisiting Data"+err);
            } 
        });
        
      });
    
};

exports.edituser=(req,res)=>{       
// view connctn copied

  connectn.getConnection((err, connection) => {
    if (err) throw err;
    // Get id from url
    let id=req.params.id;
    connection.query("SELECT * FROM `student management` WHERE id=?", [id],(err,rows)=>{
        connection.release();

        if(!err){
            // console.log("Good");
            res.render("edituser",{rows});

        }else{
            console.log("Error in Lisiting Data"+err);
        } 
    });
    
  });
};
// edit route
exports.edit=(req,res)=>{
    connectn.getConnection((err, connection) => {
        if (err) throw err;
        const {name,age,city}=req.body;
        let id=req.params.id;

        connection.query("UPDATE `student management` SET `Name`=?,`Age`=?,`City`=? WHERE ID=?", [name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                // if any no error 1st change data base then its want to show the edit page so here add get connection again
                connectn.getConnection((err, connection) => {
                    if (err) throw err;
                    // Get id from url
                    let id=req.params.id;
                    connection.query("SELECT * FROM `student management` WHERE id=?", [id],(err,rows)=>{
                        connection.release();
                
                        if(!err){
                            // console.log("Good");
                            res.render("edituser",{rows,message:"User detail updated successfully!"});
                
                        }else{
                            console.log("Error in Lisiting Data"+err);
                        } 
                    });
                    
                  });
            }else{
                console.log("Error in Lisiting Data"+err);
            } 
        });
        
      });
    
};

//delete
exports.deleteuser=(req,res)=>{
    connectn.getConnection((err,connection)=>{
        if(err) throw err
        //GET ID from url
        let id=req.params.id;
        connection.query("DELETE FROM `student management` WHERE ID=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        })
    })
   
};
