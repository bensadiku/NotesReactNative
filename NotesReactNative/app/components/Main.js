import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Note from './Note';

export default class Main extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }  
  }
  
  render(){
    let notes = this.state.noteArray.map((val,key)=>{
      return <Note key={key} keyval={key} val={val}
      deleteMethod={ ()=> this.deleteNote(key)}/>
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Notes React Native  </Text>
        </View>
  
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
  
        <View style ={styles.footer}>
          <TextInput style={styles.textInput}
          onChangeText={(noteText) => this.setState({noteText})}
          value={this.state.noteText}
          placeholder='Add note...'
          placeholderTextColor='white'
          underlineColorAndroid = 'transparent'>
  
          </TextInput>
        </View>
        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
          <Text style ={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
   
  //TODO, add Realm, save
  addNote(){
    console.log("addnote pressed")

    if(this.state.noteText){
      
      var d = new Date();

      this.state.noteArray.push({
        'date': d.getFullYear() +
        "/" + (d.getMonth() + 1) + 
        "/" + d.getDate(),
        'note': this.state.noteText
      });
      this.setState({noteArray: this.state.noteArray})
      this.setState ({noteText: ''});
    }
  }

  deleteNote (key){
    this.state.noteArray.splice(key,1);
    this.setState({noteArray: this.state.noteArray})
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 10,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 70,
    backgroundColor: '#2980b9',
    width: 50,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 34,
  },
});