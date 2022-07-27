import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity, Modal, Button } from 'react-native';

export default function App() {

const [modalVisible,setModalVisible] = useState(false);
const [pegaValorA, setPegaValorA] = useState(null)
const [pegaValorG, setPegaValorG] = useState(null)
const [alcGaso, setAlcGaso] = useState('')
const inputRef = useRef(null);

function calcular(){
  
  if(pegaValorA =='' || pegaValorG == ''){
    alert('Preencha os campos corretamente!')
    return;
  }else{

    setModalVisible(true)
    
    let calculaComb = (parseFloat(pegaValorA) / parseFloat(pegaValorG));
    
    if(calculaComb < 0.7 ){
      setAlcGaso('Compensa usar Álcool')
    }else{
      setAlcGaso('Compensa usar Gasolina')
    }
  }
}
  
  function limpaCampos(){
  setPegaValorA('');
  setPegaValorG('');

  inputRef.current.focus();
}

function fecharModal(){
  setModalVisible(false)

  limpaCampos();
}

  return (
    <View style={styles.container}>
      <View style={{marginTop:'5%'}}>
        <Image
          source={require('./src/img/logo.png')}
        />
        <Text style={{
          color:'#fff',fontSize:20,fontWeight:'bold',
          marginTop:'7%',textAlign:'center'
        }}>Qual a melhor opção?</Text>
      </View>

      <View style={styles.areaInput}>
        <Text style={styles.textCampo}>Álcool (preço por litro):</Text>
        <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={pegaValorA}
        onChangeText={(valorA) => {setPegaValorA(valorA)}}

        ref={inputRef}
        />

        <Text style={styles.textCampo}>Gasolina (preço por litro):</Text>
        <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={pegaValorG}
        onChangeText={(valorG) => setPegaValorG(valorG)}
        />

        <TouchableOpacity style={{
          backgroundColor:'#1df',
          marginTop:'6%',
          paddingVertical:'4%',
          borderRadius:6,
          alignItems:'center'
        }} onPress={calcular}>
          <Text style={{color:'#fff',fontSize:19, fontWeight:'bold'}}>Calcular</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType=''>
          <View style={styles.areaModal}>
            <View style={styles.areaImgModal}>
                <Image
                source={require('./src/img/gas.png')}
                />
                <Text style={styles.textoResultado}> {alcGaso} </Text>
            </View>
            <View style={styles.areaPreco}>
                <Text style={{color:'#fff', fontSize:22, fontWeight:'bold',marginBottom:'4%'}}>Com os preços: </Text>

                <Text style={{color:'#fff', fontSize:16}}>Álcool: R$ {pegaValorA}</Text>
                <Text style={{color:'#fff', fontSize:16}}>Gasolina: R$ {pegaValorG}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={fecharModal}>
              <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>Calcular Novamente</Text>
            </TouchableOpacity>
          </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaInput:{
    width: '90%',
    marginTop:'5%',
  },
  textCampo:{
    color: '#fff',
    fontSize:16,
    fontWeight:'bold',
    marginTop:'4%'
  },
  input:{
    backgroundColor:'#fff',
    fontSize:20,
    paddingVertical:10,
    paddingStart:25,
    borderRadius:5,
    marginTop:'2%'
  },
  areaModal:{
    backgroundColor:'#292929',
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  areaImgModal:{
    alignItems:'center',
    marginBottom:'17%'
  },
  textoResultado:{
    color: '#1df',
    fontSize:25,
    fontWeight:'bold',
    marginVertical:'6%'
  },
  areaPreco:{
    alignItems:'center',
    backgroundColor:'#212121',
    paddingVertical:30,
    width: '75%',
    borderRadius: 7,
    borderColor:'#f1f1f1',
    borderWidth:0.3
  },
  btn:{
    backgroundColor:'#292020',
    borderWidth:0.5,
    borderColor:'#1df',
    height: 45,
    justifyContent:'center',
    width: '75%',
    marginTop:'9%',
    alignItems: 'center',
    borderRadius:6
  }
});
