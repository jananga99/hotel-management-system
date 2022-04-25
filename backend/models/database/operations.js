const path = require('path');
const connection = require(path.resolve(__dirname, "connection.js"));


/*
    dataObject = {
        name: "a",
        description: "Oliver Queen"
    }
    sql = insert into tableName (name, description) values('a','jnr')
*/
insertValuesSql = (tableName, dataObject)=>{
    let sql = "insert into " + tableName + "(";
    let s1 = "";
    let s2 = "";
    let i = 0;
    Object.entries(dataObject).forEach(entry => {
        s1 = s1 + " " + `${entry[0]}`;
        s2 = s2 + " " + `'${entry[1]}'`;
        if(i!=Object.entries(dataObject).length-1){
            s1 = s1 + ",";
            s2 = s2 + ",";
        }   
        i+=1; 
    });
    sql = sql + s1 + " ) values (" + s2 + ")";
    return sql;
}


/*
    dataArray = ["name","description"]
    sql = "name, descripton "
*/
commaSequenceString = (dataArray)=>{
    let s = "";
    let i = 0;
    dataArray.forEach(element => {
        s = s + element
        if(i!=dataArray.length-1){
            s = s + ", ";
        }else{
            s = s + " ";
        }
        i+=1;
    });
    return s;
}


/*
    dataObject = {
        name: "a",
        description: "Oliver Queen"
    }
    if(comma==true) s = "name='a', descripton='Oliver Queen'"
    else    s = "name='a' and descripton='Oliver Queen'"
*/
equalSequenceString = (dataObject, comma)=>{
    let s = "";
    let i =0;
    Object.entries(dataObject).forEach(entry => {
        s = s + `${entry[0]}='${entry[1]}'`;
        if(i!=Object.entries(dataObject).length-1){
            if(comma){
                s = s + ", ";
            }else{
                s = s + " and ";
            }
            
        };
        i+=1;
    });
    return s;
}

/*
    Accepts a sql and executes it. Returns results or the error.
*/
executeQuery = (sql, done)=>{
    connection.query(sql, (err,result)=>{
        if(err) return done(err);
        return done(null, result);
    });
}


/*
    dataObject = {
        name: "Oliver Queen",
        description: "Green Arrow"
    }
    result = 5 (any number  <---- insert id)  
*/
insertTuple = (tableName, dataObject, done)=>{
    if(typeof(tableName)!=='string'){
        return done(new Error("tableName in insertTuple is required and must be a string", "_helpers/databse/operatons.js"));
    }if(typeof(dataObject)!=='object' && typeof(dataObject)!=='undefined'){
        return done(new Error("dataObject in insertTuple must be an object.", "_helpers/databse/operatons.js"));
    }
    let sql = insertValuesSql(tableName, dataObject);
    executeQuery(sql, done)
};


/*
    dataObject = {
        attributeList: ['name', 'description'],
        whereObject: {
            id: 5,
            name: 'asd'    
        },
        orderList: [id, name],
        desc : true
    }
    sql = select name, description from tableName where id='5' and name='asd' order by id, name desc
    result = [{record1}, {record2}, {record3} ...........]             ; recordi is an object
    records are java script lists
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
selectTuple = (tableName, dataObject, done)=>{
    let sql = "select ";
    if( dataObject!==null  && 'attributeList' in dataObject && dataObject.attributeList.length>0){
        sql = sql + commaSequenceString(dataObject.attributeList);
    }else{
        sql = sql + " * ";
    }
    sql = sql + "from " + tableName;
    let where = 0;
    if(dataObject!==null && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
        sql = sql + " where " + equalSequenceString(dataObject.whereObject);
        where = 1;
    };
    if(dataObject!==null && 'like' in dataObject && dataObject.like){
        if(where==0)    sql = sql + " where "
        sql = sql + dataObject.like.searchBy + ` like '%${dataObject.like.search}%' `;
    }
    if(dataObject!==null && 'orderList' in dataObject && dataObject.orderList.length>0){
        sql = sql + " order by " + commaSequenceString(dataObject.orderList);
    };
    if(dataObject!==null && 'desc' in dataObject && dataObject.desc){
        sql = sql + " desc";
    };  
    executeQuery(sql, (err, results)=>{
        if(err) return done(err, false)
        let arr = [];
        results.forEach(element => {
            arr.push(JSON.parse(JSON.stringify(element)))
        });
        done(null, arr)
    })
}


/*
    dataObject = {
        whereObject: {
            id: 5,
            name: 'asd'    
        },
        valueObject: {
            id: 12,
            name: 'jnr kbnb'    
        }
    }
    sql = update tableName set id='12', name='jnr kbnb' where id=5 and name='asd'
    result = object about status of update operation
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
updateTuple = (tableName, dataObject, done)=>{
    let sql = "update " + tableName + " set " + equalSequenceString(dataObject.valueObject,true);
    if(typeof(dataObject)==='object' && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
        sql = sql + " where " + equalSequenceString(dataObject.whereObject);
    };   
    executeQuery(sql, done)
}


/*
    dataObject = {
        whereObject: {
            id: 5,
            name: 'asd'    
        }
    }
    sql = delete from tableName where id=5 and name='asd'
    result = object about status of delete operation
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
deleteTuple = (tableName, dataObject, done)=>{
    let sql = "delete from " + tableName + " where " +  equalSequenceString(dataObject.whereObject);
    executeQuery(sql, done)
}


module.exports = {
    executeQuery,
    insertTuple,
    selectTuple,
    updateTuple,
    deleteTuple
};




// SAMPLES WITH USING CALLBACKS (CHECK PREVIOUS COMMITS FOR CALLBACK VERSION)
/*
let dataObject = {
    whereObject: {
      id: 5,
      name: 'r'
    }
  };
  dboper.insertTuple("user", dataObject, (err)=>{
      if(err) throw err;
      console.log("Insert success");
  })
  dboper.selectTuple("user", dataObject, (err, result)=>{
    if(err) throw(err)
    console.log(result)
  })
  dboper.updateTuple("user", dataObject, (err,result)=>{
    if(err) {throw err};
    console.log(result);
  })
  dboper.deleteTuple("user", dataObject, (err,result)=>{
    if(err) {throw err};
    console.log(result)
  })
  */