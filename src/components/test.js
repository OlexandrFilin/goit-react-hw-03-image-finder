//   async componentDidUpdate(prevProps, prevState) {
//     // по умові обов‘яково - при зміні state чи при зміні сторінки
//     if (
//       prevState.querry !== this.state.querry ||
//       prevState.page !== this.state.page
//     ) {
//       try {
//         // виклик фу запиту на бекенд з аргументами термін пошуку та номер стор.
//         const images = await FetchImages(this.state.querry, this.state.page);
//         // this.setState({ hits: images });
//         this.setState(prev => ({
//           hits: [...prev.hits, ...images],
//         }));
//       } catch (error) {
//         this.setState({ error: true });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }
