import React, { useState } from 'react'
import { ButtonCircle, Text } from '@/components/atoms'
import { ImageGroup, ITableProps, Table } from '@/components/molecules'

import { HStack } from '@/components/ui/hstack'
import { Dimensions, Platform } from 'react-native'
import { formatNumberToReal } from '@/utils/formatString'

const screenHeight = Dimensions.get('window').height

const PRODUCTS = [
	{
		id: 9000,
		images: [
			'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
			'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
			'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
			'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
			'https://nivalmix.vteximg.com.br/arquivos/ids/178709-1000-1000/Nivalmix_Compasso_Escolar_STira_Linha_C-115_Sertic_599976.jpg?v=637334586376070000',
		],
		name: 'Compasso Escolar Compasso Escolar Compasso',
		quantity: 7,
		costPrice: 35,
		salePrice: 93,
		barcode: 7891234560000,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2025-07-21',
		createdAt: '01/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9001,
		images: [
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caneta-esferografica-1-2mm-cristal-fashion-com-12-pecas-bic_426481.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caneta-esferografica-1-2mm-cristal-fashion-com-12-pecas-bic_426481.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caneta-esferografica-1-2mm-cristal-fashion-com-12-pecas-bic_426481.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caneta-esferografica-1-2mm-cristal-fashion-com-12-pecas-bic_426481.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caneta-esferografica-1-2mm-cristal-fashion-com-12-pecas-bic_426481.webp',
		],
		name: 'Caneta Esferográfica',
		quantity: 9,
		costPrice: 23,
		salePrice: 82,
		barcode: 7891234560001,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2027-03-16',
		createdAt: '02/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9002,
		images: [
			'https://images.tcdn.com.br/img/img_prod/1286516/regua_30cm_fullcolor_dello_507_1_728bfd72d996cc8b0c638c1f47cc89dc.jpg',
			'https://images.tcdn.com.br/img/img_prod/1286516/regua_30cm_fullcolor_dello_507_1_728bfd72d996cc8b0c638c1f47cc89dc.jpg',
			'https://images.tcdn.com.br/img/img_prod/1286516/regua_30cm_fullcolor_dello_507_1_728bfd72d996cc8b0c638c1f47cc89dc.jpg',
			'https://images.tcdn.com.br/img/img_prod/1286516/regua_30cm_fullcolor_dello_507_1_728bfd72d996cc8b0c638c1f47cc89dc.jpg',
			'https://images.tcdn.com.br/img/img_prod/1286516/regua_30cm_fullcolor_dello_507_1_728bfd72d996cc8b0c638c1f47cc89dc.jpg',
		],
		name: 'Régua 30cm',
		quantity: 6,
		costPrice: 12,
		salePrice: 71,
		barcode: 7891234560002,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2025-02-27',
		createdAt: '03/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9003,
		images: [
			'https://images.tcdn.com.br/img/img_prod/406359/tesoura_escolar_multiuso_13cm_lamina_de_aco_inox_e_corpo_plastico_masterprint_mp502_3741_1_bbda60f9f34b62fcca20c6dbea7787e7_20220707124956.jpg',
			'https://images.tcdn.com.br/img/img_prod/406359/tesoura_escolar_multiuso_13cm_lamina_de_aco_inox_e_corpo_plastico_masterprint_mp502_3741_1_bbda60f9f34b62fcca20c6dbea7787e7_20220707124956.jpg',
			'https://images.tcdn.com.br/img/img_prod/406359/tesoura_escolar_multiuso_13cm_lamina_de_aco_inox_e_corpo_plastico_masterprint_mp502_3741_1_bbda60f9f34b62fcca20c6dbea7787e7_20220707124956.jpg',
			'https://images.tcdn.com.br/img/img_prod/406359/tesoura_escolar_multiuso_13cm_lamina_de_aco_inox_e_corpo_plastico_masterprint_mp502_3741_1_bbda60f9f34b62fcca20c6dbea7787e7_20220707124956.jpg',
			'https://images.tcdn.com.br/img/img_prod/406359/tesoura_escolar_multiuso_13cm_lamina_de_aco_inox_e_corpo_plastico_masterprint_mp502_3741_1_bbda60f9f34b62fcca20c6dbea7787e7_20220707124956.jpg',
		],
		name: 'Tesoura Escolar',
		quantity: 7,
		costPrice: 50,
		salePrice: 108,
		barcode: 7891234560003,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2025-08-27',
		createdAt: '04/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9004,
		images: [
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caderno-universitario-tilidisco-west-tilibra_1050775.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caderno-universitario-tilidisco-west-tilibra_1050775.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caderno-universitario-tilidisco-west-tilibra_1050775.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caderno-universitario-tilidisco-west-tilibra_1050775.webp',
			'https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caderno-universitario-tilidisco-west-tilibra_1050775.webp',
		],
		name: 'Caderno Universitário',
		quantity: 6,
		costPrice: 29,
		salePrice: 119,
		barcode: 7891234560004,
		category: 'Escolar',
		store: 'Papelaria Criativa',
		validUntil: '2027-02-21',
		createdAt: '05/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9005,
		images: [
			'https://b2bleonorashop.vtexassets.com/arquivos/ids/159613/apontador-duplo-oval-azul-4534.jpg?v=637937699131430000',
			'https://b2bleonorashop.vtexassets.com/arquivos/ids/159613/apontador-duplo-oval-azul-4534.jpg?v=637937699131430000',
			'https://b2bleonorashop.vtexassets.com/arquivos/ids/159613/apontador-duplo-oval-azul-4534.jpg?v=637937699131430000',
			'https://b2bleonorashop.vtexassets.com/arquivos/ids/159613/apontador-duplo-oval-azul-4534.jpg?v=637937699131430000',
			'https://b2bleonorashop.vtexassets.com/arquivos/ids/159613/apontador-duplo-oval-azul-4534.jpg?v=637937699131430000',
		],
		name: 'Apontador',
		quantity: 8,
		costPrice: 6,
		salePrice: 55,
		barcode: 7891234560005,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2025-04-02',
		createdAt: '06/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9006,
		images: [
			'https://http2.mlstatic.com/D_NQ_NP_734233-MLU72542356272_112023-O.webp',
			'https://http2.mlstatic.com/D_NQ_NP_734233-MLU72542356272_112023-O.webp',
			'https://http2.mlstatic.com/D_NQ_NP_734233-MLU72542356272_112023-O.webp',
			'https://http2.mlstatic.com/D_NQ_NP_734233-MLU72542356272_112023-O.webp',
			'https://http2.mlstatic.com/D_NQ_NP_734233-MLU72542356272_112023-O.webp',
		],
		name: 'Régua 30cm Aço Inox',
		quantity: 9,
		costPrice: 26,
		salePrice: 108,
		barcode: 7891234560006,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-06-12',
		createdAt: '07/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9007,
		images: [
			'https://a-static.mlcdn.com.br/1500x1500/borracha-escolar-faber-castell-tk-plastica/lojamicrotec/2765p/845812bfe5cae1cc948b2f1b7c4681f1.jpeg',
			'https://a-static.mlcdn.com.br/1500x1500/borracha-escolar-faber-castell-tk-plastica/lojamicrotec/2765p/845812bfe5cae1cc948b2f1b7c4681f1.jpeg',
			'https://a-static.mlcdn.com.br/1500x1500/borracha-escolar-faber-castell-tk-plastica/lojamicrotec/2765p/845812bfe5cae1cc948b2f1b7c4681f1.jpeg',
			'https://a-static.mlcdn.com.br/1500x1500/borracha-escolar-faber-castell-tk-plastica/lojamicrotec/2765p/845812bfe5cae1cc948b2f1b7c4681f1.jpeg',
			'https://a-static.mlcdn.com.br/1500x1500/borracha-escolar-faber-castell-tk-plastica/lojamicrotec/2765p/845812bfe5cae1cc948b2f1b7c4681f1.jpeg',
		],
		name: 'Borracha Escolar',
		quantity: 3,
		costPrice: 10,
		salePrice: 88,
		barcode: 7891234560007,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-03-25',
		createdAt: '08/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9008,
		images: [
			'https://arquivos.luga.com.br/produtos/original/2289_LG3501-Juvenil.jpg',
			'https://arquivos.luga.com.br/produtos/original/2289_LG3501-Juvenil.jpg',
			'https://arquivos.luga.com.br/produtos/original/2289_LG3501-Juvenil.jpg',
			'https://arquivos.luga.com.br/produtos/original/2289_LG3501-Juvenil.jpg',
			'https://arquivos.luga.com.br/produtos/original/2289_LG3501-Juvenil.jpg',
		],
		name: 'Agenda Escolar',
		quantity: 3,
		costPrice: 46,
		salePrice: 103,
		barcode: 7891234560008,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2026-10-22',
		createdAt: '09/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9009,
		images: [
			'https://livrariascuritiba.vteximg.com.br/arquivos/ids/2199180-1000-1000/PP072304.jpg?v=638689212587670000',
			'https://livrariascuritiba.vteximg.com.br/arquivos/ids/2199180-1000-1000/PP072304.jpg?v=638689212587670000',
			'https://livrariascuritiba.vteximg.com.br/arquivos/ids/2199180-1000-1000/PP072304.jpg?v=638689212587670000',
			'https://livrariascuritiba.vteximg.com.br/arquivos/ids/2199180-1000-1000/PP072304.jpg?v=638689212587670000',
			'https://livrariascuritiba.vteximg.com.br/arquivos/ids/2199180-1000-1000/PP072304.jpg?v=638689212587670000',
		],
		name: 'Régua 30cm Dobrável',
		quantity: 4,
		costPrice: 35,
		salePrice: 75,
		barcode: 7891234560009,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2026-11-08',
		createdAt: '10/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9010,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Cola Bastão',
		quantity: 7,
		costPrice: 14,
		salePrice: 105,
		barcode: 7891234560010,
		category: 'Escolar',
		store: 'Papelaria Criativa',
		validUntil: '2025-07-27',
		createdAt: '11/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9011,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Grampeador Pequeno',
		quantity: 4,
		costPrice: 48,
		salePrice: 81,
		barcode: 7891234560011,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2025-12-22',
		createdAt: '12/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9012,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Borracha Escolar',
		quantity: 4,
		costPrice: 9,
		salePrice: 57,
		barcode: 7891234560012,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-05-25',
		createdAt: '13/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9013,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Agenda Escolar',
		quantity: 1,
		costPrice: 18,
		salePrice: 94,
		barcode: 7891234560013,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-03-26',
		createdAt: '14/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9014,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Corretivo Líquido',
		quantity: 1,
		costPrice: 45,
		salePrice: 71,
		barcode: 7891234560014,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2027-01-14',
		createdAt: '15/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9015,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Clips de Papel',
		quantity: 7,
		costPrice: 6,
		salePrice: 83,
		barcode: 7891234560015,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2026-01-15',
		createdAt: '16/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9016,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Cola Bastão',
		quantity: 6,
		costPrice: 50,
		salePrice: 52,
		barcode: 7891234560016,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-09-12',
		createdAt: '17/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9017,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Régua 30cm',
		quantity: 6,
		costPrice: 9,
		salePrice: 56,
		barcode: 7891234560017,
		category: 'Escritório',
		store: 'Papelaria Criativa',
		validUntil: '2025-05-02',
		createdAt: '18/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9018,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Calculadora Básica',
		quantity: 4,
		costPrice: 19,
		salePrice: 51,
		barcode: 7891234560018,
		category: 'Escolar',
		store: 'Papelaria Criativa',
		validUntil: '2026-07-18',
		createdAt: '19/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9019,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Papel Sulfite A4',
		quantity: 4,
		costPrice: 33,
		salePrice: 92,
		barcode: 7891234560019,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-02-19',
		createdAt: '20/12/2024 às 00:00',
		actions: '',
	},
	{
		id: 9020,
		images: [
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
			'https://img.kalunga.com.br/fotosdeprodutos/174950z_1.jpg',
		],
		name: 'Papel Sulfite A4',
		quantity: 4,
		costPrice: 33,
		salePrice: 92,
		barcode: 7891234560019,
		category: 'Papelaria',
		store: 'Papelaria Criativa',
		validUntil: '2026-02-19',
		createdAt: '20/12/2024 às 00:00',
		actions: '',
	},
]

type IProduct = (typeof PRODUCTS)[0]

export interface IStockProductsTableProps
	extends Omit<ITableProps<IProduct>, 'data'> {}

export const StockProductsTable = ({
	fixedCol = 'quantity',
	...props
}: IStockProductsTableProps) => {
	const [curPage, setCurPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [order, setOrder] = useState<ITableProps<IProduct>['order']>({
		by: 'createdAt',
		dir: 'desc',
	})

	return (
		<Table
			data={PRODUCTS}
			fixedCol={fixedCol}
			order={order}
			onChangeOrder={setOrder}
			curPage={curPage}
			onChangeCurPage={setCurPage}
			perPage={perPage}
			// totalRows={800}
			onChangePerPage={setPerPage}
			mapTitle={{
				quantity: 'QTD.',
				name: 'NOME',
				costPrice: 'PREÇO DE CUSTO',
				salePrice: 'PREÇO DE VENDA',
				barcode: 'CÓDIGO DE BARRAS',
				category: 'CATEGORIA',
				store: 'LOJA',
				validUntil: 'DATA DE VALIDADE',
				createdAt: 'DATA DE CRIAÇÃO',
				actions: 'AÇÕES',
			}}
			mapTableColProps={{
				id: { style: { width: 80 } },
				quantity: { style: { width: 80 } },
				name: { style: { width: 260 } },
				barcode: { style: { width: 190 } },
				createdAt: { style: { width: 190 } },
				actions: { style: { width: 118 } },
			}}
			renderItemHearder={{
				actions: ({ header }) => (
					<Text size="sm" className="w-full text-center" numberOfLines={1}>
						{header.title}
					</Text>
				),
			}}
			renderItemCol={{
				name: ({ row }) => (
					<HStack className="items-center" style={{ maxWidth: 220 }}>
						<ImageGroup
							src={row.images}
							display={1}
							className="scale-125 ml-2 mr-3"
						/>
						<Text className="flex-1 text-base leading-tight" numberOfLines={1}>
							{row.name}
						</Text>
					</HStack>
				),
				costPrice: ({ row }) => (
					<Text size="sm" numberOfLines={1}>
						{formatNumberToReal(row.costPrice)}
					</Text>
				),
				salePrice: ({ row }) => (
					<Text size="sm" numberOfLines={1}>
						{formatNumberToReal(row.costPrice)}
					</Text>
				),
				actions: () => (
					<HStack className="w-full justify-around gap-1">
						<ButtonCircle
							size="sm"
							iconProps={{ name: 'Edit', color: 'success_600' }}
						/>
						<ButtonCircle
							size="sm"
							iconProps={{ name: 'Trash', color: 'error_600' }}
						/>
					</HStack>
				),
			}}
			scrollContainerProps={{
				style: {
					maxHeight:
						Platform.OS === 'web'
							? screenHeight - 264
							: Platform.OS === 'ios'
								? screenHeight - 420
								: screenHeight - 320,
				},
			}}
			{...props}
		/>
	)
}
