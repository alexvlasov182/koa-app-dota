import { React, Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';

const style = {
  card: {
    maxWidth: 545,
  },
  media: {
    height: 340,
  },
};
class App extends Component {
  render() {
    return (
      <div className='background'>
        <h1 className='title'>Best Heroes of the International 2021</h1>
        <Card className='card' style={style.card}>
          <CardActionArea>
            <CardMedia style={style.media}>
              <img src={this.props.image} alt={this.props.title} />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {this.props.title}
              </Typography>
              <Typography component='p'>{this.props.content}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' color='primary' onClick={this.props.onClickLearn}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.get('title'),
  content: state.get('content'),
  image: state.get('image'),
});

const mapDispatchToProps = (dispatch) => ({
  onClickLearn: () => dispatch({ type: 'LEARN MORE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
