import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

const CongratulationsSVG = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={150} height={150} {...props}>
    <G data-name="Group 20108" transform="translate(-132 -168.802)">
      <G data-name="Group 19740">
        <G data-name="Group 19738" transform="translate(132 168.802)">
          <Circle data-name="Ellipse 48" cx={75} cy={75} r={75} opacity={0.1} />
          <Circle
            data-name="Ellipse 47"
            cx={61}
            cy={61}
            r={61}
            transform="translate(14 14)"
            opacity={0.5}
          />
          <Circle
            data-name="Ellipse 46"
            cx={45}
            cy={45}
            r={45}
            transform="translate(30 30)"
          />
        </G>
      </G>
      <Circle
        data-name="Ellipse 517"
        cx={46.5}
        cy={46.5}
        r={46.5}
        transform="translate(161 199)"
      />
      <Path
        data-name="Path 14795"
        d="m186.73 246.809 11.132 11.289 29.315-28.589"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={5}
      />
    </G>
  </Svg>
);

export default CongratulationsSVG;
