# Player Ratings

A simple algorithm to determine football player rating based on the position played and stats.
This algorithm is made for personal use only which I will be using on my games.

It will also generate a stat card and also image of the player with rating on it.

## Demo

## Positions

1. GK (Goalkeeper)
2. CB (Defender)
3. CM (Midfielder)
4. ST (Attacker)****

## Match Stats

1. Goals Scored
2. Assists
3. Shots
4. On Target Shots
5. Keeper Saves
6. Tackles Won
7. Key Passes

## Rating Calculation and Priorities

### Goal Keeper (GK)

| Stat | More value | Less value |
| --- | --- | --- |
| Keeper Saves | high affect | high affect |
| Goals Scored | Very high affect | No affect |
| Assists | high affect | Very less affect |
| Shots | Slight less affect | Slight less affect |
| On Target Shots | Medium affect | Medium affect |
| Tackles Won | Medium affect | Medium affect |
| Key Passes | Slightly more affect | Medium affect |

### Defender (CB)

| Stat | More value | Less value |
| --- | --- | --- |
| Keeper Saves | high affect | No affect |
| Goals Scored | Slightly high affect | Slightly lower affect |
| Assists | high affect | Medium affect |
| Shots | Medium affect | Medium affect |
| On Target Shots | Slightly high affect | Slightly lower affect |
| Tackles Won | High affect | High affect |
| Key Passes | Slightly more affect | Medium affect |

### Midfielder (CM)

| Stat | More value | Less value |
| --- | --- | --- |
| Keeper Saves | high affect | No affect |
| Goals Scored | High affect | High affect |
| Assists | High affect | High affect |
| Shots | Medium affect | Medium affect |
| On Target Shots | Slightly higher affect | Medium affect |
| Tackles Won | High affect | Medium affect |
| Key Passes | High affect | High affect |

### Attacker (ST)

| Stat | More value | Less value |
| --- | --- | --- |
| Keeper Saves | high affect | No affect |
| Goals Scored | High affect | High affect |
| Assists | Higher affect | High affect |
| Shots | High affect | High affect |
| On Target Shots | High affect | High affect |
| Tackles Won | High affect | No affect |
| Key Passes | Slightly more affect | Medium affect |

## Alternate Possibility

Might have played multiple positions in a match.

## Tip

**`assets/player.jpg`** is the default image used for player image generation, which is ignored in the repository. You can replace it with your own image to generate player images with ratings.
