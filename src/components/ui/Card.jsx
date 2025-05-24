import React from 'react';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Card = ({
  children,
  className = '',
  interactive = false,
  onClick,
  ...props
}) => {
  const cardClasses = `
    card p-4
    ${interactive ? 'card-interactive cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div 
      className={cardClasses} 
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
  interactive = false,
  onClick,
  ...props
}) => {
  const cardClasses = `
    card p-6
    ${interactive ? 'card-interactive cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div 
      className={cardClasses} 
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {icon && (
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary-light)]/10 text-[var(--color-primary)]">
          <Icon name={icon} size={24} />
        </div>
      )}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-[var(--color-text-secondary)]">{description}</p>}
    </div>
  );
};

export const CropCard = ({
  image,
  cropName,
  status,
  plantedDate,
  harvestDate,
  health,
  className = '',
  interactive = true,
  onClick,
  ...props
}) => {
  const cardClasses = `
    card overflow-hidden
    ${interactive ? 'card-interactive cursor-pointer' : ''}
    ${className}
  `;

  // Status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'growing':
        return 'bg-[var(--color-primary-light)] text-white';
      case 'harvested':
        return 'bg-[var(--color-success)] text-white';
      case 'issue':
        return 'bg-[var(--color-danger)] text-white';
      case 'planned':
        return 'bg-[var(--color-info)] text-white';
      default:
        return 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]';
    }
  };

  // Health indicator color
  const getHealthColor = (health) => {
    if (health >= 80) return 'text-[var(--color-success)]';
    if (health >= 50) return 'text-[var(--color-warning)]';
    return 'text-[var(--color-danger)]';
  };

  return (
    <div 
      className={cardClasses} 
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <div className="relative">
        <Image 
          src={image} 
          alt={cropName} 
          className="w-full h-48 object-cover"
        />
        {status && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{cropName}</h3>
        <div className="flex flex-col gap-2">
          {plantedDate && (
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <Icon name="Calendar" size={16} className="mr-2" />
              <span>Planted: {plantedDate}</span>
            </div>
          )}
          {harvestDate && (
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <Icon name="CalendarCheck" size={16} className="mr-2" />
              <span>Harvest: {harvestDate}</span>
            </div>
          )}
          {health !== undefined && (
            <div className="flex items-center text-sm">
              <Icon name="Activity" size={16} className="mr-2" />
              <span>Health: </span>
              <span className={`ml-1 font-medium ${getHealthColor(health)}`}>{health}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MarketplaceCard = ({
  image,
  productName,
  price,
  seller,
  rating,
  location,
  category,
  className = '',
  interactive = true,
  onClick,
  ...props
}) => {
  const cardClasses = `
    card overflow-hidden
    ${interactive ? 'card-interactive cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div 
      className={cardClasses} 
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      <div className="relative">
        <Image 
          src={image} 
          alt={productName} 
          className="w-full h-48 object-cover"
        />
        {category && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium">
            {category}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{productName}</h3>
          <div className="text-lg font-bold text-[var(--color-primary)]">{price}</div>
        </div>
        <div className="flex flex-col gap-2">
          {seller && (
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <Icon name="User" size={16} className="mr-2" />
              <span>{seller}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
              <Icon name="MapPin" size={16} className="mr-2" />
              <span>{location}</span>
            </div>
          )}
          {rating !== undefined && (
            <div className="flex items-center text-sm">
              <Icon name="Star" size={16} className="mr-1 text-[var(--color-warning)]" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MetricCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendLabel,
  className = '',
  ...props
}) => {
  const cardClasses = `
    card p-6
    ${className}
  `;

  // Trend color and icon
  const getTrendDetails = () => {
    if (!trend) return {};
    
    switch (trend) {
      case 'up':
        return { 
          icon: 'TrendingUp', 
          color: 'text-[var(--color-success)]',
          label: trendLabel || 'Increase'
        };
      case 'down':
        return { 
          icon: 'TrendingDown', 
          color: 'text-[var(--color-danger)]',
          label: trendLabel || 'Decrease'
        };
      case 'neutral':
        return { 
          icon: 'Minus', 
          color: 'text-[var(--color-text-tertiary)]',
          label: trendLabel || 'No change'
        };
      default:
        return {};
    }
  };

  const trendDetails = getTrendDetails();

  return (
    <div className={cardClasses} {...props}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-[var(--color-text-secondary)]">{title}</h3>
        {icon && <Icon name={icon} size={24} className="text-[var(--color-primary)]" />}
      </div>
      <div className="flex flex-col">
        <div className="text-3xl font-bold mb-2">{value}</div>
        {trend && trendValue && (
          <div className={`flex items-center ${trendDetails.color}`}>
            <Icon name={trendDetails.icon} size={16} className="mr-1" />
            <span className="font-medium">{trendValue}</span>
            <span className="text-sm ml-1">{trendDetails.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;