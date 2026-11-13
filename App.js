import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [tarefaAtual, setTarefaAtual] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

    const handleAdicionarTarefa = () => {
        if (tarefaAtual.trim() === '') {
            return;
        }
        const novaLista = [...listaTarefas, tarefaAtual];
        setListaTarefas(novaLista);
        salvarDadosLocal(novaLista);
        setTarefaAtual('');
    };

    const salvarDadosLocal = async (listaDeDados) => {
        const dadosJSON = JSON.stringify(listaDeDados);
        await AsyncStorage.setItem('minhas_tarefas', dadosJSON);
    };
    const resgatarDadoslocal = async () => {
        const dadosJSONLidos = await AsyncStorage.getItem('minhas_tarefas');

        if (dadosJSONLidos !== null) {
            const listaViva = JSON.parse(dadosJSONLidos);
            setListaTarefas(listaViva);
        }
    };

    return (
        useEffect(() => {
            resgatarDadoslocal();
        }, []),
        (
            <View style={styles.container}>
                <View style={styles.blocoUm}></View>
                <View style={styles.blocoDois}></View>
                <View style={styles.blocoTres}></View>

                <Text style={styles.text}>App de Controle de Tarefas e Anotações de Campo!</Text>

                <View style={styles.view}>
                    <TextInput
                        style={styles.input}
                        value={tarefaAtual}
                        onChangeText={setTarefaAtual}
                        placeholder="Digite a anotação..."
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setListaTarefas(() => [...listaTarefas, tarefaAtual]);
                            handleAdicionarTarefa();
                        }}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {listaTarefas.map((tarefa, index) => (
                        <Text key={index}>{tarefa}</Text>
                    ))}
                </ScrollView>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    button: {
        backgroundColor: '#fcd705',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    blocoUm: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
    blocoDois: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
    blocoTres: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 35,
    },
    input: {
        flex: 1,
        height: 48,
        padding: 14,
        borderRadius: 10,
        borderColor: '#1dc0dd',
        borderWidth: 2,
        fontSize: 16,
    },
    button: {
        width: 56,
        height: 48,
        marginLeft: 10,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#167a81',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    view: {
        flexDirection: 'row',
        width: 340,
        paddingHorizontal: 24,
    },
});
