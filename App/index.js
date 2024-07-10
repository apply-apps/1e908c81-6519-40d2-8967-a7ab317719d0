// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStory = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a creative storyteller. Generate a fairy tale based on the given heroes, villains, and plot." },
                    { role: "user", content: `Heroes: ${hero}, Villains: ${villain}, Plot: ${plot}` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter hero(es)..."
                    value={hero}
                    onChangeText={setHero}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter villain(s)..."
                    value={villain}
                    onChangeText={setVillain}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter the plot..."
                    value={plot}
                    onChangeText={setPlot}
                />

                <Button
                    title="Generate Story"
                    onPress={fetchStory}
                    disabled={loading}
                />

                {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

                {story ? <Text style={styles.story}>{story}</Text> : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    loader: {
        marginVertical: 20,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
});