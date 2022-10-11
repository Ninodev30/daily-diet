import { useState, useCallback } from 'react';
import { SectionList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MealListTypeProps } from 'src/@types/meal';
import daysOfDietGetAll from '@storage/date/daysOfDietGetAll';
import Header from '@components/Header';
import Highlight from '@components/Highlight';
import Button from '@components/Button';
import ListItem from '@components/ListItem';
import ListHeader from '@components/ListHeader';
import ListEmpty from '@components/ListEmpty';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = MealListTypeProps;

const Home = () => {
    const [list, setList] = useState<Props[]>([]);
    const navigation = useNavigation();
    
    const handleScreens = {
        newMeal: () => navigation.navigate('newMeal'),
        statistics: () => navigation.navigate('statistics'),
        meal: (date: any) => navigation.navigate('meal', {meal: date})
    }

    const fetchDaysOfDiet = async() => {
        try{[0]
            const data = await daysOfDietGetAll();
            setList(data);
        }
        catch(error){
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchDaysOfDiet();
    }, []))

    return(
        <S.Container>
            <Header />
            <Highlight
                title={90.86}
                type='PRIMARY'
                icon='arrow-top-right'
                sideOfIcon='RIGHT'
                style={{ height: 102 }}
                onFunction={handleScreens.statistics}
            />
            <S.ContentButton>
                <S.TitleContentButton>
                    Refeições
                </S.TitleContentButton>
                <Button
                    title='Nova refeição'
                    icon='add'
                    type='DARK'
                    onPress={handleScreens.newMeal}
                />
            </S.ContentButton>
           <SectionList
                sections={list}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        meal={item.meal}
                        hour={item.hour}
                        isInDiet={item.isInDiet}
                        /* onPress={handleScreens.meal(item.date)} */
                        onPress={() => navigation.navigate('meal', {meal: item.date})}
                    />
                )}
                renderSectionHeader={({ section: { date } }) => (
                    <ListHeader
                        title={date}
                    />
                )}
                ListEmptyComponent = {() => (
                    <ListEmpty
                        message='Adicione as refeições diárias'
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </S.Container>
    )
} 

export default Home;