import { useAppSelector } from "../store/store";
import { IGame } from "../interface/IGame";
import { Grid } from "semantic-ui-react";
import CardComponents from "./CardComponents";

import Filter from "./Filter";

const CardList = () => {
  const {game} = useAppSelector((state) => state.gameList);
  
  return (
    <div>
      <Filter/>
      <Grid centered={true} container stackable columns={4}>
        {game?.map((game: IGame) =>  (
            <Grid.Column key={game.id}>
              <CardComponents
                title={game.title}
                id={game.id}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
                game_url={game.game_url}
                publisher={game.publisher}
                genre={game.genre}
                release_date={game.release_date}
                platform={game.platform}
                developer={game.developer}
                freetogame_profile_url={game.freetogame_profile_url}
              />
            </Grid.Column>
          )
        )}
      </Grid>
    </div>
  );
};

export default CardList;
