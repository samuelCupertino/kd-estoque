import { Dimensions, ScrollView, ScrollViewProps } from 'react-native';
import { useEffect, useState } from 'react';

interface IScrollContainerProps extends Omit<ScrollViewProps, 'children'> {
  children: JSX.Element | JSX.Element[] | ((isLandscape: boolean) => JSX.Element | JSX.Element[])
}

export const ScrollContainer = ({ children, ...props }: IScrollContainerProps) => {
  const screenMetrics = Dimensions.get('window');
  const [isLandscape, setIsLandscape] = useState(screenMetrics.width > screenMetrics.height);

  useEffect(() => {
    const updateOrientation = () => {
      const screenMetrics = Dimensions.get('window');
      setIsLandscape(screenMetrics.width > screenMetrics.height);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);

    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 8, ...isLandscape ? { paddingLeft: 92 } : { paddingBottom: 92 } }}
      showsVerticalScrollIndicator={false}
    >
      {typeof children === 'function' ? children(isLandscape) : children}
    </ScrollView>
  );
}