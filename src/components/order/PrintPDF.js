// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4',
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1,
//     },
//     text: {
//         fontSize: 12,
//         textAlign: 'left',
//     },
// });
//
// function PDFDocument({ userData }) {
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.section}>
//                     <Text style={styles.text}>Custom PDF</Text>
//                     <Text style={styles.text}>This is a custom PDF generated from data:</Text>
//                     <Text style={styles.text}>Name: {userData.name}</Text>
//                     <Text style={styles.text}>Email: {userData.email}</Text>
//                 </View>
//             </Page>
//         </Document>
//     );
// }
//
// function PrintPDF() {
//     const userData = {
//         name: 'John Doe',
//         email: 'john@example.com',
//     };
//
//     return (
//         <div>
//             <PDFViewer width="100%" height={600}>
//                 <PDFDocument userData={userData} />
//             </PDFViewer>
//         </div>
//     );
// }
//
// export default PrintPDF;
