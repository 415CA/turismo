import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import {
  Typography,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Container,
  Button,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 32,
  },
  card: {
    minWidth: 275,
    marginBottom: 16,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  space: {
    marginRight: 8,
  },
  daily: {
    justifyContent: 'space-between',
    display: 'flex',
    marginRight: 32,
  },
}));

const Wikipedia = (search) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState('');
  const destination = search.destination;

  let config = {
    method: 'get',
    url: `${'https://cors-anywhere.herokuapp.com/'}https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${destination}&formatversion=2&exsentences=10&exlimit=1&explaintext=1`,
  };

  useEffect(() => {
    async function getWikipedia() {
      setIsLoading(true);
      const request = await axios(config)
        .then((response) => {
          console.log(response);
          setArticle(response.data.query.pages[0].extract);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return request;
    }
    getWikipedia();
  }, [config.url]);

  const truncate = (description, n) => {
    return description?.length > n
      ? description.substr(0, n - 1) + '...'
      : description;
  };
  // 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg'
  return (
    <div>
      <Fragment>
        <Container maxWidth="md" outlined raised={true}>
          <Card outlined raised={true}>
            <CardContent>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
              ></Grid>
              <Grid item>
                <CardHeader
                  title="Wikipedia"
                  avatar={
                    <Avatar
                      alt="Wikipedia"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg"
                    />
                  }
                ></CardHeader>
              </Grid>

              <Grid item>
                <div className={classes.root}>
                  <div className={classes.flex}>
                    <Typography
                      type="display1"
                    >
                      {truncate(article, 1000)}
                    </Typography>

                    <Button
                      color="default"
                      // className={classes.button}
                      href={`https://en.wikipedia.org/w/index.php?search=${destination}`}
                      target="_blank"
                      startIcon={<MenuBookIcon />}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Fragment>
    </div>
  );
};

export default Wikipedia;
