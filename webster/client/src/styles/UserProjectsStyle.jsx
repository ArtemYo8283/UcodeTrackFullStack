import { display, styled } from '@mui/system';
import { Typography, Box, Card } from '@mui/material';

const Container = styled('div')({
    position: 'relative',
    paddingLeft: '7%',
    paddingRight: '7%',
    paddingTop: '2%',
    height: '100%',
});

const TextBlock = styled('div')({
    position: 'absolute',
    borderLeft: '6px solid',
    fontSize: '30px',
    paddingLeft: '1.5%',
});

const CreateBlock = styled('div')({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '30px',
    paddingRight: '7%',
    right: '0'
});

const ElementsContainer = styled('div')({
    marginTop: '50px',
    paddingTop: '2%',
    paddingBottom: '2%',
});

const BoxText = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    height: "91%"
})

const CustomBox = styled(Card)({
    display: 'flex',
   
    padding: '1vw 1vw 0vw 1vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: '5px',
    cursor: 'pointer'
})

const PopoverBox = styled('div')({
    display: 'flex', 
    justifyContent: 'flex-end'
})
const TypographyName = styled(Typography)({
    wordWrap:'break-word',
    paddingTop: '0.25vw',
    fontSize: '20px',
    fontWeight: 'bold',
})

const TypographyData = styled(Typography)({
    wordWrap:'break-word',
    paddingBottom: '0.2vw',
    color: '#808080',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between'

})

const Image = styled('img')({
    height: '200px'
})

export { CreateBlock, Image, PopoverBox, TypographyData, Container, BoxText, TypographyName, CustomBox, ElementsContainer, TextBlock }