import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
    const [tarefaAtual, setTarefaAtual] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

    function adicionarTarefa() {
        if (tarefaAtual.trim() === '') return;

        setListaTarefas([...listaTarefas, tarefaAtual]);
        setTarefaAtual('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Tarefas</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a anotação..."
                    placeholderTextColor="#888"
                    value={tarefaAtual}
                    onChangeText={setTarefaAtual}
                />

                <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <View style={styles.content}>
                    <ScrollView style={styles.scrollView}>
                        {listaTarefas.map((item, index) => (
                            <View key={index} style={styles.card}>
                                <Text style={styles.cardText}>{item}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    content: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#D1D1D6',
    },
    cardText: {
        fontSize: 16,
        color: '#1C1C1E',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginRight: 10,
    },
    button: {
        width: 52,
        height: 52,
        backgroundColor: '#007AFF',
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
    },
});
