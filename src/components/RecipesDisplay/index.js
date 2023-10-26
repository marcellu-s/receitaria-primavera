import { useState, useCallback, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import Recipe from '../Recipe';
import { getAllRecipes } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

const RecipesDisplay = () => {

    const route = useRoute()

    const { userData } = useContext(UserContext);

    const [ loading, setLoading ] = useState(false);
    const [ recipes, setRecipes ] = useState([]);

    useFocusEffect(

        useCallback(() => {

            const currentRoute = route.name

            async function getRecipes() {

                setLoading(true);
    
                const data = await getAllRecipes(userData.id);
    
                if (data.status === true && data.recipes.length > 0) {

                    setLoading(false);

                    setRecipes(data.recipes);
                } else {
    
                    if (data.status === false) {
    
                        alert(data.msg);

                        setLoading(false);
                    }
                }
            }

            if (currentRoute == 'MyHome') {

                getRecipes();

            } else if (currentRoute == 'Favorites') {

                console.log(currentRoute);

            } else if (currentRoute == 'MyRecipes') {

                console.log(currentRoute);
            }


            return () => {

                setRecipes([]);
            }
        }, [])
    );

    if (loading) {

        return (
            <View style={styles.feedbackContainer}>
                <ActivityIndicator size="large" color="#FE8A07" />
                <Text style={{fontSize: 12, fontFamily: 'Poppins-Bold'}}>CARREGANDO...</Text>
            </View>
        );
    }

    if (!recipes.length > 0) {

        return (
            <View style={styles.feedbackContainer}>
                <Text style={{fontSize: 12, fontFamily: 'Poppins-Bold'}}>NENHUMA RECEITA ENCONTRADA!</Text>
            </View>
        );
    }


    return (
        <View style={styles.recipeWrapper}>
            {
                recipes.map((item, index) => {
                    return (
                        <Recipe props={item} key={`allRecipes-${index}`} />
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    feedbackContainer: {
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    recipeWrapper: {
        marginTop: 64,
        gap: 32,
    },
});

export default RecipesDisplay;