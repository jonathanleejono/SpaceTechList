/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Flex, Grid, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import NFT from 'components/card/NFT';
import Banner from 'views/admin/marketplace/components/Banner';

// Assets
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';

export default function Marketplace() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const test = [
  {
    "name":["Marketplace",false],
    "quantity": 2458, 
    "date": "12.Jan.2021",
    "progress": 75.5  
  },
  {
    "name":["Venus DB PRO",true],
    "quantity": 1485, 
    "date": "21.Feb.2021",
    "progress": 35.4  
  },
  {
    "name":["Venus DS",true],
    "quantity": 1024, 
    "date": "13.Mar.2021",
    "progress": 25  
  }];

  const test2 = [
				 {"name": 'Abstract Colors', "author":'By Esthera Jackson', 
  				  "bidders":[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ],
				  "image": Nft1,
				  "currentbid":'0.91 ETH',
				  "download":'#'},
				 {"name": 'Abstract Colors', "author":'By Esthera Jackson', 
  				  "bidders":[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ],
				  "image": Nft1,
				  "currentbid":'0.91 ETH',
				  "download":'#'},
				 {"name": 'Abstract Colors', "author":'By Esthera Jackson', 
  				  "bidders":[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ],
				  "image": Nft1,
				  "currentbid":'0.91 ETH',
				  "download":'#'},
				]
	
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<Grid
				mb='20px'
				gridTemplateColumns={{ xl: 'repeat(2, 1fr)', '2xl': '1fr 0.46fr' }}
				gap={{ base: '20px', xl: '20px' }}
				display={{ base: 'block', xl: 'grid' }}>
				<Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
					<Banner />
					<Flex direction='column'>
						<Flex
							mt='45px'
							mb='20px'
							justifyContent='space-between'
							direction={{ base: 'column', md: 'row' }}
							align={{ base: 'start', md: 'center' }}>
							<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
								Trending NFTs
							</Text>
						</Flex>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
							<NFT
								name='Abstract Colors'
								author='By Esthera Jackson'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Nft1}
								currentbid='0.91 ETH'
								download='#'
							/>
							<NFT
								name='ETH AI Brain'
								author='By Nick Wilson'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Nft2}
								currentbid='0.91 ETH'
								download='#'
							/>
							<NFT
								name='Mesh Gradients '
								author='By Will Smith'
								bidders={[ Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1 ]}
								image={Nft3}
								currentbid='0.91 ETH'
								download='#'
							/>
						</SimpleGrid>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
						{test.map((obj) => (
							<Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
								{obj.date}
							</Text>
						))}

						</SimpleGrid>
						<SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
						{test2.map((obj) => (
							<NFT
								key={obj.name}
								name={obj.name}
								author={obj.author}
								bidders={obj.bidders}
								image={obj.image}
								currentbid={obj.currentbid}
								download={obj.download}
							/>
						))}

						</SimpleGrid>
					</Flex>
				</Flex>
			</Grid>
		</Box>
	);
}
