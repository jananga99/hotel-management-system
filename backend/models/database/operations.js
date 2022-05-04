const path = require('path');
const connection = require(path.resolve(__dirname, "connection.js"));


/*
    keys = [
        'name',
        'description'
    ]
    sql = insert into tableName (name, description) values(?,?)
*/
insertValuesSql = (tableName, keys)=>{
    let sql = "insert into " + tableName + "(";
    let s1 = "";
    let s2 = "";
    let i = 0;
    keys.forEach(key => {
        s1 = s1 + " " + key;
        s2 = s2 + " ?";
        if(i!=keys.length-1){
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
    keys = [ name, description ]
    if(comma==true) s = "name=?, descripton=?"
    else    s = "name=? and descripton=?"
*/
equalSequenceString = (keys, comma)=>{
    let s = "";
    let i =0;
    keys.forEach(key => {
        s = s + `${key}=?`;
        if(i!=keys.length-1){
            if(comma)   s = s + ", ";
            else    s = s + " and ";
        };
        i+=1;
    });
    return s;
}

/*
    Accepts a sql and executes it. Returns results or the error.
    values is an array containing values for placeholders.
        Placeholders are used to prevent sql injection.
    sql = insert into tableName (name, description) values(?,?)
    values = [ "Oliver Queen", "The mayor at Star City."]
*/
executeQuery = (sql, values, done)=>{
    connection.query(sql, values, (err,result)=>{
        if(err) return done(err);
        return done(null, result);
    });
}


/*
    dataObject = {
        name: "Oliver Queen",
        description: "The mayor at Star City."
    }
    sql = insert into tableName (name, description) values(?,:?)  
*/
insertTuple = (tableName, dataObject, done)=>{
    let sql = insertValuesSql(tableName, Object.keys(dataObject));
    executeQuery(sql, Object.values(dataObject), done)
};


/*
    dataObject = {
        attributeList: ['name', 'description'],
        whereObject: {
            city: 'Central City,
            name: 'Barry Allen'    
        },
        orderList: [id, job],
        desc : true
    }
    sql = select name, description from tableName where city=? and name=? order by id, job desc
    result = [{record1}, {record2}, {record3} ...........]             ; recordi is an object
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
selectTuple = (tableName, dataObject, done)=>{
    let sql = "select ";
    if( dataObject!==null  && 'distinct' in dataObject && dataObject.distinct){
        sql = sql + "distinct ";
    }    
    if( dataObject!==null  && 'attributeList' in dataObject && dataObject.attributeList.length>0){
        sql = sql + commaSequenceString(dataObject.attributeList);
    }else{
        sql = sql + " * ";
    }
    sql = sql + "from " + tableName;
    let where = 0;
    if(dataObject!==null && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
        sql = sql + " where " + equalSequenceString(Object.keys(dataObject.whereObject));
        where = 1;
    };
    if(dataObject!==null && 'like' in dataObject && dataObject.like){
        if(where==0)    sql = sql + " where "
        else    sql = sql + " and "
        sql = sql + dataObject.like.searchBy + ` like '%${dataObject.like.search}%' `;
    }
    if(dataObject!==null && 'orderList' in dataObject && dataObject.orderList.length>0){
        sql = sql + " order by " + commaSequenceString(dataObject.orderList);
    };
    if(dataObject!==null && 'desc' in dataObject && dataObject.desc){
        sql = sql + " desc";
    };  
    let values = null;
    if(where)   values = Object.values(dataObject.whereObject)
    executeQuery(sql, values, (err, results)=>{
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
            name: 'Jason Todd'    
        },
        valueObject: {
            name: 'Damian Wayne',
            age: 10    
        }
    }
    sql = update tableName set name=?, age=? where id=? and name=?
    result = object about status of update operation
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
updateTuple = (tableName, dataObject, done)=>{
    let sql = "update " + tableName + " set " + equalSequenceString(Object.keys(dataObject.valueObject),true);
    let values = [ ...Object.values(dataObject.valueObject)]
    if(typeof(dataObject)==='object' && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
        sql = sql + " where " + equalSequenceString(Object.keys(dataObject.whereObject));
        values = [...values, ...Object.values(dataObject.whereObject) ]
    }
    executeQuery(sql, values, done)
}


/*
    dataObject = {
        whereObject: {
            id: 5,
            name: 'Lex Luthor'    
        }
    }
    sql = delete from tableName where id=? and name=?
    result = object about status of delete operation
    NOTE: sql can be differ according to given keys and values of dataObject
    NOTE: all keys of dataObject are not compulsory for code to execute.
 */
deleteTuple = (tableName, dataObject, done)=>{
    let sql = "delete from " + tableName + " where " +  equalSequenceString(Object.keys(dataObject.whereObject));
    executeQuery(sql,Object.values(dataObject.whereObject),  done)
}


module.exports = {
    executeQuery,
    insertTuple,
    selectTuple,
    updateTuple,
    deleteTuple
};




/* 
SAMPLES WITH USING CALLBACKS 
db.insertTuple('test', dataObject, (err, result)=>{
  if(err) return console.log(err.message)
  console.log(result)
})
db.selectTuple('test', {
  whereObject:{
    name: "Oliver Queen"
  },
  attributeList: ['id', 'love', 'city'],
  orderList: ['id'],
  desc: true
}, (err, result)=>{
  if(err) return console.log(err.message)
  console.log(result)
})
db.updateTuple('test', {
  whereObject:{
    id: 3,
    name: "Oliver Queen"
  },
  valueObject:{
    name: "Barry Allen",
    city: "Central City"
  }
}, (err, result)=>{
  if(err) return console.log(err.message)
  console.log(result)
})
db.deleteTuple('test', {
  whereObject:{
    age: 30
  }
}, (err, result)=>{
  if(err) return console.log(err.message)
  console.log(result)
})
*/