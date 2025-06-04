import {Dimensions} from 'react-native';
import {Svg, G, Text as SVGText} from 'react-native-svg';

const CustomXAxisLabels_Weekly_Performance = ({
  datas,
  chartWidth,
}: {
  datas: any[];
  chartWidth: number;
}) => {
  const bandwidth = chartWidth / datas.length;
  // console.log('datas --- ' + JSON.stringify(datas, null, 2));

  return (
    <Svg height={50} width={chartWidth} style={{marginTop: -30}}>
      <G>
        {datas.map((item, index) => {
          const centerX = index * bandwidth + bandwidth / 1.3;
          const y = 2;

          return (
            <SVGText
              key={`x-axis-label-${index}`}
              x={centerX}
              y={y}
              fontSize={height * 0.006}
              fill="black"
              rotation={-45}
              origin={`${centerX},${y}`}
              textAnchor="end">
              {item.dates}
            </SVGText>
          );
        })}
      </G>
    </Svg>
  );
};
const {width, height} = Dimensions.get('screen');
export default CustomXAxisLabels_Weekly_Performance;
