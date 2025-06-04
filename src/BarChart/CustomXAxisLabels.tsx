// import React from 'react';
// import {Svg, Text as SVGText, TSpan} from 'react-native-svg';

// interface ClusteredDataItem {
//   part?: string;
//   opName?: string;
// }

// interface CustomXAxisLabelsProps {
//   clusteredData: ClusteredDataItem[];
//   x: (index: number) => number;
//   bandwidth: number;
//   height: number;
// }

// const CustomXAxisLabels: React.FC<CustomXAxisLabelsProps> = ({
//   clusteredData,
//   x,
//   bandwidth,
//   height,
// }) => {
//   const fontSize = height * 0.05;

//   return (
//     <Svg width="100%" height={height} style={{marginTop: -50}}>
//       {clusteredData.map((item, index) => {
//         if (index % 2 !== 0) return null; // skip second bar in cluster
//         const part = item.part || '';
//         const opName = item.opName || '';
//         const centerX = x(index) + bandwidth / 2;

//         return (
//           <SVGText
//             key={`x-axis-label-${index}`}
//             x={centerX}
//             y={height - 30}
//             fontSize={fontSize}
//             fill="black"
//             rotation={-90}
//             origin={`${centerX},${height - 40}`}
//             textAnchor="middle">
//             <TSpan x={centerX} dy="0">
//               {opName}
//             </TSpan>
//             <TSpan x={centerX} dy="6">
//               {' '}
//               {/* Adds vertical spacing */}
//               {part}
//             </TSpan>
//           </SVGText>
//         );
//       })}
//     </Svg>
//   );
// };

// export default CustomXAxisLabels;

import React from 'react';
import {Svg, Text as SVGText, TSpan} from 'react-native-svg';

interface ClusteredDataItem {
  part?: string;
  opName?: string;
}

interface CustomXAxisLabelsProps {
  clusteredData: ClusteredDataItem[];
  x: (index: number) => number;
  bandwidth: number;
  height: number;
}

const CustomXAxisLabels: React.FC<CustomXAxisLabelsProps> = ({
  clusteredData,
  x,
  bandwidth,
  height,
}) => {
  const fontSize = height * 0.05;
  const clusterPadding = 5; // You can adjust this value

  return (
    <Svg width="100%" height={height} style={{marginTop: -75}}>
      {clusteredData.map((item, index) => {
        const part = item.part || '';
        const opName = item.opName || '';

        // Compute centerX with additional padding between clusters
        const clusterIndex = Math.floor(index / 1);
        const spacing = clusterIndex * clusterPadding;
        const centerX = x(index) + bandwidth / 2 + spacing;

        return (
          <SVGText
            key={`x-axis-label-${index}`}
            x={centerX}
            y={height - 40}
            fontSize={fontSize}
            fill="black"
            rotation={-90}
            origin={`${centerX},${height - 30}`}
            textAnchor="middle">
            <TSpan x={centerX} dy="0">
              {opName}
            </TSpan>
            <TSpan x={centerX} dy="6">
              {part}
            </TSpan>
          </SVGText>
        );
      })}
    </Svg>
  );
};

export default CustomXAxisLabels;
